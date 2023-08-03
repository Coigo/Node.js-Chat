import { CreateNewUser } from "./index.js"

export default function CreateObserver() {
    const observers = {
        subscribed: []
    } 

                function Subscribe(func) {
                    console.log('passo 2')
                    observers.subscribed.push(func)

                }

                function unSubscribe(func) {
                    console.log('passo 5')
                    observers.subscribed.filter(funcoes => funcoes != func)
                
                }

                function notifyAll(data) {
                    console.log('passo 3')
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