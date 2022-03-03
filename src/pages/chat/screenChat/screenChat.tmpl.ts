export const getScreenChat = (messages: string)=>{
  return `<div class="screenChat">
  <div class="screenChat__correspondence js-scroll">
    ${messages}
  </div>
  <div class="screenChat__send" @handlerChangeInput="handlerPrintMessage" >

    <Input 
      ::placeholder='Написать сообщение'
      ::class="screenChat__print js-input"
      ::name='message'
      ::type='text'
      ::needForwardEmit="true"
    />
    <div 
      class="screenChat__icon" 
      @click="handlerSendMessage"
    >
        <img src="{{ iconSend }}" alt=" " /></div>
  </div>
</div>`;
};
// <div class="screenChat__icon"><img src="{{ iconClip }}" alt=" " /></div>
