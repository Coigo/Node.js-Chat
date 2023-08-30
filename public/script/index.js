import CreateObserver from "./observer.js"

const MessageContainer = document.getElementById('MessageContainer')
var guesthasbeenset = false
var guestID 

const Observer = CreateObserver()

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




export function Validate(NewUser) {
      const { password, confirmation } = NewUser
      if ( password === confirmation ) {
          
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








