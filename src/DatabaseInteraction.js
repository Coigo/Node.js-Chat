const fs = require('fs');
const { resolve } = require('path');

const sqlite = require('sqlite3')
const db = new sqlite.Database('./src/users.db')




function SaveNewUser(newUser) {
  console.log(newUser)
  const { Username, Password, id } = newUser;

  



  function InsertNewUser() {
    db.run('INSERT INTO usuarios (Username, Password, id) VALUES (?, ?, ?)', [Username, Password, id], function(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('> Inserção realizada com sucesso.');

      db.close();
    });
  }

  return InsertNewUser();
}


function SelectUserFromDb(username, password) {
  return new Promise((resolve, reject) => {
    db.all('SELECT Username FROM usuarios WHERE Username = ? AND Password = ?', [username, password], function(err, rows) {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}



function readJsonFile(File) {
    return new Promise((resolve, reject) => {
      fs.readFile(File, 'utf-8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const Json = JSON.parse(data)
          resolve(Json)
        }
      })
    })
  }
  
  function SalvarObjeto(Json, File) {
    try {
      fs.writeFileSync(File, ObjetoEmJson(Json));
      console.log('Mensagem salva.');
    } catch (err) {
      console.error('Erro ao salvar mensagem:', err);
    }
  }
  
  
  
  function ObjetoEmJson(Objeto) {
    const JsonTOPush = JSON.stringify(Objeto)
    return JsonTOPush
  }

  function CheckIfUsernameExist(UserInfo) {
    return new Promise((naoExiste, existe) => {
      const { username } = UserInfo
      db.all("Select Username from usuarios where Username = ?", [username], (err, user) => {
        
        if ( user[0] == undefined) { naoExiste(err) }
        else if (err) {
            
        }
        else { existe(user) }
      })
    })
  }


  module.exports =  {
    readJsonFile,
    SalvarObjeto,
    SaveNewUser,
    SelectUserFromDb,
    CheckIfUsernameExist
}



