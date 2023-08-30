const DbInteraction = require('./DatabaseInteraction')

const express = require('express');
const http = require('http');
const { Server } = require("socket.io")
const axios = require('axios')

const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app)
const io = new Server(server)


 

//-----------------------------------------------------------------------------------------------

app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended:true
}))

console.log('> Servidor reiniciado')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../public/index.html')
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' })
})

app.get('/signup', (req, res) => {
  res.sendFile('signup.html', { root: 'public' })
})


app.post('/login', async (req, res) => {
  const userInfo = req.body
  console.log(userInfo)


})

app.post('/signup', async (req, res) => {
  try {
    const userInfo = req.body
    console.log(userInfo)
    const result = await axios.post('http://localhost:4002/signup', userInfo)
    res.send(result)
  
  } catch (err) {
    console.log(err)
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
        socket.broadcast.emit('reenviarMensagem', Msg)

        DbInteraction.readJsonFile('src/mensagens.json')
          .then(allMessages => {
            allMessages.push(Msg)
            DbInteraction.SalvarObjeto(allMessages, 'src/mensagens.json')



          })
          .catch(err => {
            console.log(err)
          })

      })
})

function VerifyTOKEN(req, res, next) {
  const token = req.headers['x-access-token']
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if ( err ) return req.status(401)

      req = decoded
      next()
  })
}

server.listen(4001, () => {
  console.log('Aplicação ativa na porta 4001')
});

