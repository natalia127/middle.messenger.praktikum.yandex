import Avatar from '../../components/avatar/avatar.tmpl'
const context = {

};
const profileChat = 
`<div class="profileChat">
  <div class="profileChat__iconSettings"></div>
  <div class="profileChat__title"> Профиль чата </div>
  {% Avatar %}
  <div class="profileChat__party">
    <div class="profileChat__partyTitle">Участники</div>
    <ul class="profileChat__partyList">
      <li class="profileChat__participant">
        <div class="profileChat__imgParticipant ">
        </div>
        <div>name profile</div>
      </li>
    </ul>
  </div>
</div>`

const blockTemplate = function() {

  return `${profileChat}
  `;
}

export  default {
  blockTemplate,
  context,
  children: {
    Avatar
  }
}