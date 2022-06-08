export const getTempl = function (infoUsersChat: string) {
  return `<div class="profileChat">
  <div class="profileChat__iconSettings"></div>
  <div class="profileChat__title"> Профиль чата </div>
  <div class="profileChat__avatar">
  <Avatar 
    ::className= 'avatar-md'
    ::srcImg=pathAvatar
  />
  </div>

  <div class="profileChat__party">
    <div class="profileChat__partyTitle">Участники</div>
    <ul class="profileChat__partyList">
      ${infoUsersChat}
    </ul>
  </div>
</div>`;
};
