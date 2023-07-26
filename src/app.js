const DbInteraction = require('./DatabaseInteraction')
const User = require('./Users')
const express = require('express');
const http = require('http');
const { Server } = require("socket.io")

const bodyParser = require("body-parser");
const { dirname } = require('path');
const { send } = require('process');

const app = express();
const server = http.createServer(app)
const io = new Server(server)






//-----------------------------------------------------------------------------------------------

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended:true
}))

console.log('> Servidor reiniciado')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../public/index.html')
});

app.get('/signin', (req, res) => {
  res.sendFile(__dirname + '../public/signin.html')
});

 app.post('/signin', (req, res) => {
    let Username = req.body.UserName
    let Password = req.body.password
   
    let newUser = User.UserFactory(Username, Password)
    
    DbInteraction.SaveNewUser(newUser)
 })

 app.get('/login', (req, res) => {
  res.sendFile(__dirname + '../public/login.html')
})

app.post('/login', (req, res) => {
  let username = req.body.UserName;
  let password = req.body.password;

  DbInteraction.SelectUserFromDb(username, password)
    .then(rows => {
      if (rows.length > 0) {

        res.sendFile(__dirname + '../public/index.html')
        res.send
      } else {
        // Usuário não encontrado ou senha incorreta
        console.log("Usuário não encontrado");
        res.sendStatus(401);
  
      }
    })
    .catch(err => {
      // Trata o erro adequadamente
      console.log(err);
      res.sendStatus(500);
    });
});



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
        console.log(Msg)
        socket.broadcast.emit('reenviarMensagem', Msg)

        DbInteraction.readJsonFile('src/mensagens.json')
          .then(allMessages => {
            allMessages.push(Msg)
            console.log(allMessages)

            DbInteraction.SalvarObjeto(allMessages, 'src/mensagens.json')



          })
          .catch(err => {
            console.log(err)
          })

      })
      socket.on('CreateNewUser', (newUserInfo) => {
        DbInteraction.CheckIfUsernameExist(newUserInfo)
        .then((handler) => {
          console.log('usuario aceiro')
          console.log(User.UserFactory(newUserInfo))
        })
        .catch((err) => {
          console.log()
          socket.emit('usuarioInvalido', 'erro')
        })
        
      })

})

server.listen(4001, () => {
  console.log('Aplicação ativa na porta 4001')
});

