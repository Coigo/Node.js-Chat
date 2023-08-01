import CreateObserver from "./observer.js"

const MessageContainer = document.getElementById('MessageContainer')
var guesthasbeenset = false
var guestID 


export function MessageFactory(msg, Username) {

  function CreateMessageObject() {
    const MsgJson = {
      msg,
      Username
    }
    
    return MsgJson
  
  }
  return CreateMessageObject()
}







const  MessageStructure = (Message) => {
  return `<p class="userid">${Message.Username}</p>
  <p class=Message>${Message.msg}</p>
  `
}

export function AddMessage(Message) {
  if ( Message.msg != '') {
    const MessageBox = document.createElement('div')
    MessageBox.classList = 'MessageBox'
    MessageBox.innerHTML = MessageStructure(Message)
  
    MessageContainer.appendChild(MessageBox)

  }
  
}



export function CreateNewUser(NewUser) {

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


