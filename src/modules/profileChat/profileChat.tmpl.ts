export const profileChatTmpl: string = `<div class="profileChat">
  <div class="profileChat__iconSettings"></div>
  <div class="profileChat__title"> Профиль чата </div>
  <div class="profileChat__avatar">  {% avatar %}</div>

  <div class="profileChat__party">
    <div class="profileChat__partyTitle">Участники</div>
    <ul class="profileChat__partyList">
      <li class="profileChat__participant">
        <div class="profileChat__imgParticipant "> {% avatar1 %}
        </div>
        <div>name profile</div>
      </li>
    </ul>
  </div>
</div>`;
