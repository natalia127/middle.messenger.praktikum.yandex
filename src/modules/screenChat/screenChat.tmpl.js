import Input from '../../components/input/input.tmpl'
const context = {

};

// const screenChat = `<div class="chat fullContainer">
//   <div class="chat__choice">Выберите чат чтобы отправить сообщение</div>
// </div>`
const screenChat = 
`<div class="chat">
  <div class="chat__correspondence">
    <div class="chat__wrapperMessages">
      <div class="chat__imgProfile"></div>
      <div class="chat__messages">
        <div class="chat__message">
          Какое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщение
        </div>
      </div>
    </div>
    <div class="chat__wrapperMessages">
      <div class="chat__imgProfile"></div>
      <div class="chat__messages">
        <div class="chat__message">
        Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222
        </div>
        <div class="chat__message">
        Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222
        </div>
      </div>
    </div>
  </div>
  {%
    Input
    context: {
      placeholder: 'Написать сообщение',
      class: 'chat__print',
      type: 'text'
    }
  %}
</div>`

const blockTemplate = function() {

  return `${screenChat}
  `;
}

export  default {
  blockTemplate,
  context,
  children: {
    Input
  }
}