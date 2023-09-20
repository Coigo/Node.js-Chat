export default class User {

    constructor(user) {
        const { username, id } = user
        this.username = username
        this.id = id
    }
    
    GetName() {
        return this.username
    }
    Logoff() {
        this.username = undefined
    }


}

