const DbInteraction = require('./DatabaseInteraction')

const { Server } = require("socket.io")
const express = require('express');
const http = require('http');

const axios = require('axios')
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const crypto = require('crypto')
const { private, decrypt } = require('./modules.js');
const { error } = require('console');

const app = express();
const server = http.createServer(app)
const io = new Server(server)

require('dotenv').config()



function AuthTOKEN(req, res, next) {
  try {
    console.log("o Token recebido é: ", req.cookies.tonen)
    const user = jwt.verify(req.cookies.tonen, process.env.SECRET)
    console.log(`Usuario Atutenticado ${user}`);
    const { username, id } = user 



    const privateAuth = private( {username, id} ) //privateAuth é uma camada de segurança a mais. Um usuario poderia criar uma nova instancia da classe usuario e mandar uma mensagem na conta de outra pessoa
    console.log(privateAuth)
    req.decoded = { username, id,  privateAuth } 
    req.decoded.ok = 1
    console.log('Cookie Criado:', req.decoded)
    next()
    
    
  } catch (err) {
    console.log(err)
    res.clearCookie("tonen")
    return res.writeHead(302, { "location": "/login" } ).end()
      
  }
}

//-----------------------------------------------------------------------------------------------

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended:true
}))


console.log('> Servidor reiniciado')

app.get('/', (req, res) => {
  console.log('aaaaa')
  res.sendFile(__dirname + '../public/index.html')
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' })
})

app.get('/signup', (req, res) => {
  res.sendFile('signup.html', { root: 'public' })
})


app.post('/', AuthTOKEN, (req, res) => {
  const user = req.decoded
  console.log('A decodificação é: ', user)
  return res.status(200).send(JSON.stringify(user))
})

app.post('/login', async (req, res) => {
  const userInfo = req.body
  console.log(userInfo)
  try {
    console.log('Requisição de login  feita à API')
    const login = await axios.post('http://localhost:4002/login', userInfo)
    res.cookie('tonen', login.data,  {  maxAge: 180000 , httpOnly: true }  )
    res.writeHead(302, { 'Location': '/' })
    res.status(200).end()
  }
  catch ( err ) {
    console.log('Usuario não Conectado')
    if ( err.status === 401 ) res.status(401).end()
    else res.status(500).end()
  
}


})

app.post('/signup', async (req, res) => {
  try {
    const userInfo = req.body
    console.log(userInfo)
    if (userInfo.usernameStatus == 1 && userInfo.emailStatus == 1) {
      const result = await axios.post('http://localhost:4002/create', userInfo )    
      res.status(result.status).end()
    } 
    else {
      const err = new Error("Alguma das verificações está incorreta")
      err.status = 400
      throw err
  }
  } 
  catch (err) {
    console.log('err')
    res.status(err.status || 500).end()

  }
})


io.on('connection', (socket) => {
  console.log(`Usuario conectado com id ${socket.id}`)

    DbInteraction.readJsonFile('src/mensagens.json')
      .then(allMessages => {  
        socket.emit('SendState', allMessages) 
      })
      .catch(err => {
        console.error(err)
      })

      socket.on('disconnect', () => {
          console.log(`Usuario com id ${socket.id} se desconectou`)

      })

      socket.on('Mensagem', ( Msg ) => {
        const { msg, Auth } = Msg
        
        const auth = JSON.parse(decrypt(Auth))
        const { username, id } = auth
        if ( id ) {
          socket.broadcast.emit('reenviarMensagem',  { msg, username }  )
  
          DbInteraction.readJsonFile('src/mensagens.json')
            .then(allMessages => {
              allMessages.push({ msg, id })
              DbInteraction.SalvarObjeto(allMessages, 'src/mensagens.json')
  
          })
          .catch(err => {
            console.log(err)
          })
          
        }
        else {
          console.log('erraasd')
        }

      })
      socket.on('CheckUsername', async (  username  ) => {
        try {
          const result = await axios.post('http://localhost:4002/check', username )
          const { checkType } = result.data
          socket.emit( 'checkStatus', {
            status: result.status,
            checkType
          })

        }
        catch (err) {
          const { checkType } = err.response.data
          socket.emit( 'checkStatus', {
            status: err.response.status,
            checkType
          })
          
        }
        
      })
})



server.listen(4001, () => {
  console.log('Aplicação ativa na porta 4001')
});

