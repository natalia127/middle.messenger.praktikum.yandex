// const screenChat = `<div class="screenChat fullContainer">
//   <div class="screenChat__choice">Выберите чат чтобы отправить сообщение</div>
// </div>`

export const screenChat: string = `<div class="screenChat">
  <div class="screenChat__correspondence">
    <div class="screenChat__wrapperMessages">
      <div class="screenChat__imgProfile">{% avatar1 %}</div>
      <div class="screenChat__messages">
        <div class="screenChat__message">
          Какое-то сообщениеКакое-то сообщ ениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщение
        </div>
      </div>
    </div>
    <div class="screenChat__wrapperMessages">
      <div class="screenChat__imgProfile">{% avatar2 %}</div>
      <div class="screenChat__messages">
        <div class="screenChat__message">
        Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222
        </div>
        <div class="screenChat__message">
        Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222
        </div>
      </div>
    </div>
  </div>
  <div class="screenChat__send">
    <div class="screenChat__icon"><img src="{{ iconClip }}" alt=" " /></div>
    {%
      Input
    %}

    <div class="screenChat__icon"><img src="{{ iconSend }}" alt=" " /></div>
  </div>
</div>`;
