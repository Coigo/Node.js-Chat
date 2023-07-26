import CreateObserver from "./observer.js"

const MessageContainer = document.getElementById('MessageContainer')
var guesthasbeenset = false
var guestID 


export function MessageFactory(msg, UserID) {

  function CreateMessageObject() {
    const MsgJson = {
      msg,
      UserID
    }
    
    return MsgJson
  
  }
  return CreateMessageObject()
}







const  MessageStructure = (Message, UserID) => {
  return `<p class="userid">${UserID}</p>
  <p class=Message>${Message}</p>
  `
}

export function AddMessage(Message, UserID) {
  const MessageBox = document.createElement('div')
  MessageBox.classList = 'MessageBox'
  MessageBox.innerHTML = MessageStructure(Message, UserID)

  MessageContainer.appendChild(MessageBox)
}

export function CreateNewUser(NewUser) {
  console.log(NewUser)
  function Validate(NewUser){
      const { password, confirmation } = NewUser
      if ( password === confirmation ) {
          
            function CheckPasswordLenght() {
                    if ( password.length >= 10) {
                      return 'TudoCerto'
                    
                    }else { 
                      return 'SenhaCurta'
                    }
            }

            return CheckPasswordLenght()
      } else {
        return 'SenhasDiferentes'
      } 
  
  }
    return Validate(NewUser)
}