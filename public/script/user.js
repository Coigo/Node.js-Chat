export default class User {

    constructor(username) {
        this.username = username
    }
    
    GetName() {
        return this.username
    }
    Logoff() {
        this.username = undefined
    }

}
