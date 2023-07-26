



function UserFactory(newUser) {
    
    function AddIDtoUser() {
        newUser.id= {
            "id" : GenerateID() 
            }
            function GenerateID() {
                let id = new Date().getTime()
                return id
            }

        return newUser
    }
    return AddIDtoUser()
}







module.exports = {
    UserFactory,
}


