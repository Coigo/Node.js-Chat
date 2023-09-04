const fs = require('fs');











function LoginUser(user) {
  const { Username, Password } = user

  function SelectUserFromDb(Username, Password) {

    return new Promise((resolve, reject) => {
      db.all('SELECT Username FROM usuarios WHERE Username = ? AND Password = ?', [Username, Password], function(err, rows) {
        if (err) {
          reject(err)
        } else {
          console.log('ok')
          resolve(rows)
        }
        
      })
    })
  }
  return SelectUserFromDb(Username, Password)
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
    LoginUser,
    CheckIfUsernameExist
    
}



