const DbInteraction = require('./DatabaseInteraction')

const { Server } = require("socket.io")
const express = require('express');
const http = require('http');

const axios = require('axios')
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const crypto = require('crypto')
const { private, decrypt } = require('./modules.js')

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



    const privateAuth = private( {username, id} ) 
    console.log(privateAuth)
    req.decoded = { username, privateAuth }
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
    const result = await axios.post('http://localhost:4002/signup', userInfo )
    console.log('bbb') 
    
    res.status(result.status).end()
  
  } catch (err) {
    console.log('err')
    res.redirect('/login')
    res.status(err.status).end()

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
        console.log(username)
        try {
          const result = await axios.post('http://localhost:4002/check', username )
          socket.emit( 'usernameStatus', result.status)

        }
        catch (err) {

          socket.emit( 'usernameStatus', err.response.status)
          console.log(err.response.status)
          
        }
        
      })
})



server.listen(4001, () => {
  console.log('Aplicação ativa na porta 4001')
});

