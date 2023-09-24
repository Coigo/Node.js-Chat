import CreateObserver from "./observer.js"
import User from './user.js'

const MessageContainer = document.getElementById('MessageContainer')
var guesthasbeenset = false
var guestID 

const Observer = CreateObserver()

export function MessageFactory(msg, username, Auth) {

  function CreateMessageObject() {
    const MsgJson = {
      msg,
      username,
      Auth
    }
    
    return MsgJson
  
  }
  return CreateMessageObject()
}







const  MessageStructure = (Message) => {
  return `<p class="userid">${Message.username}</p>
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




export function Validate(NewUser) {
      const { password, confirm } = NewUser
      console.log(password, confirm)
      if ( password === confirm ) {
          
            function CheckPasswordLenght() {
                    if ( password.length >= 8) {
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



export function ChangeContent() {
  
     function ShowFrame(frame) {
    
      frame = document.getElementById(frame)
      frame.style.display = 'flex'
    }
    
     function HideFrame(frame) {
    console.log(1)
      frame = document.getElementById(frame)
      frame.style.display = 'none'
    }
    
     function changeMenuContent(currentUser) {
      const unlogedContent = document.getElementById('unlogedContent')
      const logedContent = document.getElementById('logedContent')
    
            if (currentUser === undefined) {
              unlogedContent.style.display = 'block'
              logedContent.style.display = 'none'
            }
            else {
              unlogedContent.style.display = 'none'
              logedContent.style.display = 'block'
    
            }
    }

    function ajustScroll() {
      const container = document.getElementById('MessageContainer')
      const height = container.scrollHeight 
      container.scrollTop = height
    }

    return {
      ShowFrame, 
      HideFrame, 
      changeMenuContent,
      ajustScroll
    }

}


export function getUsercredentials( user ) {
  console.log(user)
  const currentUser = new User(user)
  return currentUser
}

export function display( Message, paragraph ) {
  paragraph.innerHTML = Message
  setTimeout( () => paragraph.innerHTML = "",
  10000)
}

export function GetUsernameStatus(code) {
  const status = {
    200: () => {
      return 1
    },
    400: () => {
    return 0
    }
  }
  return status[code]()
}


