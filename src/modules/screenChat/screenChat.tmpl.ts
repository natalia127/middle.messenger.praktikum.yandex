export const screenChat: string = `<div class="screenChat">
  <div class="screenChat__correspondence">
    <div class="screenChat__wrapperMessages">
      <div class="screenChat__imgProfile"><Avatar /></div>
      <div class="screenChat__messages">
        <div class="screenChat__message">
          Какое-то сообщениеКакое-то сообщ ениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщение
        </div>
      </div>
    </div>
    <div class="screenChat__wrapperMessages">
      <div class="screenChat__imgProfile"><Avatar /></div>
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
    <Input 
      ::placeholder='Написать сообщение'
      ::class="screenChat__print"
      ::name='message'
      ::type='text'
    />
    <div class="screenChat__icon"><img src="{{ iconSend }}" alt=" " /></div>
  </div>
</div>`;
