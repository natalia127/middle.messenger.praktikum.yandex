export const getTmpl = function (usersChat: string) {
  return `<div class="settingsChat" @handlerClickAvatar="handlerSendFile" >
  <div class="settingsChat__editImg ">
    <Avatar ::className='avatar-md' ::isChange="true" ::srcImg=pathAvatar />

  </div>

  <div class="settingsChat__party">
    <div class="settingsChat__partyTitle">
      <div @click="addUserChat" class="settingsChat__icon settingsChat__iAdd"  >
        <img src="{{iconPlus}}" alt="" />
      </div>

    </div>
    <ul class="settingsChat__partyList">
      ${usersChat}
    </ul>

  </div>
  <div class="settingsChat__delChat">
    <div @click="delChat" class="settingsChat__icon settingsChat__iDelChat"  >  
      <img src="{{iconMinusChat}}" alt="" />
    </div>
    <div class="settingsChat__text">Удалить чат</div>
  </div>
</div>`;
};
