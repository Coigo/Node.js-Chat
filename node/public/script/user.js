export default class User {

    constructor(user) {
        const { username, privateAuth } = user
        this.username = username
        this.auth = privateAuth
    }
    
    GetName() {
        return this.username
    }
    GetAuth() {
        return this.auth
    }
    Logoff() {
        this.username = undefined
    }


}

