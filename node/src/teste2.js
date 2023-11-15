const DbInteraction = require('./DatabaseInteraction')

DbInteraction.readJsonFile('./LastId.json')
.then(IdSaved => {
    let NewId = IdSaved + 1
    DbInteraction.SalvarObjeto(NewId, './LastId.json')
    return NewId
    
})
.catch(err => {
  console.log(err)
})
DbInteraction.SelectUserFromDb('MrCoigo', '123123123')