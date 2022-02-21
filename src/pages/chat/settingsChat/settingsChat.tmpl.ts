export const getTmpl = function (usersChat) {
  return `<div class="settingsChat" @handlerClickAvatar="handlerSendFile" >
  <div class="settingsChat__editImg ">
    <Avatar ::className='avatar-md' ::isChange="true" ::srcImg=pathAvatar />

  </div>

  <div class="settingsChat__party">
    <div class="settingsChat__partyTitle">
      <div class="settingsChat__icon settingsChat__iAdd" @click="addUserChat">
        <img src="{{iconPlus}}" alt="" />
      </div>

    </div>
    <ul class="settingsChat__partyList">
      ${usersChat}
    </ul>

  </div>
  <div class="settingsChat__delChat">
    <div class="settingsChat__icon settingsChat__iDelChat" @click="delChat">  
      <img src="{{iconMinusChat}}" alt="" />
    </div>
    <div class="settingsChat__text">Удалить чат</div>
  </div>
</div>`;
};
