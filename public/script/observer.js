import { CreateNewUser } from "./index.js"

export default function CreateObserver() {
    const observers = {
        subscribed: []
    } 

                function Subscribe(func) {
                    observers.subscribed.push(func)

                }

                function unSubscribe(func) {
                    observers.subscribed.filter(funcoes => funcoes != func)
                
                }

                function notifyAll(data) {
                    for ( const observer of observers.subscribed ) {
                        return observer(data)
                    }
                }

    return {
        Subscribe,
        unSubscribe,
        notifyAll
    }
}