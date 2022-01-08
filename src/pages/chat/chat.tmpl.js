import listChat from '../../modules/listChat/listChat.tmpl'
import profileChat from '../../modules/profileChat/profileChat.tmpl'
import settingsChat from '../../modules/settingsChat/settingsChat.tmpl'
import screenChat from '../../modules/screenChat/screenChat.tmpl'

const context = {

};
let main = `
  <div class="row fullContainer">
     <div class="col-lg-3">{% listChat %}</div>
   <div class="col-lg-6 fullContainer">{% screenChat %}</div>
     <div class="col-lg-3">{% settingsChat %}</div>
   </div>
 `

const blockTemplate = function() {

  return `${main}
  `;
}

export  default {
  blockTemplate,
  context,
  children: {
    listChat,
    screenChat,
    profileChat,
    settingsChat
  }
}