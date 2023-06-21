const MessageContainer = document.getElementById('MessageContainer')
var guesthasbeenset = false
var guestID 


export function CreateMsgObject(msg, UserID) {
  const MsgJson = {
    msg,
    UserID
  }
  ApplyGUESTstate(MsgJson)
  return MsgJson
}



function ApplyGUESTstate(MsgJson) {

  if ( MsgJson.UserID == '' ) {
    if ( guesthasbeenset == false ) {
      
      const ID = GenerateID()
      guestID = `Guest${ID}`
      MsgJson.UserID = guestID
      guesthasbeenset = true
    
    }
    else if ( guesthasbeenset = true ) {
      MsgJson.UserID = guestID
    }

  }
  return MsgJson.UserID

}


function GenerateID() {
  const eachNumber = [];
  for (let i = 0; i < 4; i++) {
    let NumeroCriado = Math.round(Math.random() * 10);
    eachNumber.push(NumeroCriado);
  }
  const ID = eachNumber.join('');
  return ID
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