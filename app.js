const express = require('express');
const http = require('http');
const { Server } = require("socket.io")
const fs = require('fs')

const app = express();
const server = http.createServer(app)
const io = new Server(server)


function readJsonFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('mensagens.json', 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const allMessages = JSON.parse(data)
        resolve(allMessages)
      }
    })
  })
}

function SalvarMensagem(allMessages) {
  try {
    fs.writeFileSync('mensagens.json', ObjetoEmJson(allMessages));
    console.log('Mensagem salva.');
  } catch (err) {
    console.error('Erro ao salvar mensagem:', err);
  }
}



function ObjetoEmJson(Objeto) {
  const JsonTOPush = JSON.stringify(Objeto)
  return JsonTOPush
}



//-----------------------------------------------------------------------------------------------

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

console.log('> Servidor reiniciado')



io.on('connection', (socket) => {
  console.log(`Usuario conectado com id ${socket.id}`)

    readJsonFile()
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

        readJsonFile()
          .then(allMessages => {
            allMessages.push(Msg)
            console.log(allMessages)

            SalvarMensagem(allMessages)



          })
          .catch(err => {
            console.log(err)
          })
      })

})

server.listen(4001, () => {
  console.log('Aplicação ativa na porta 4001')
});

