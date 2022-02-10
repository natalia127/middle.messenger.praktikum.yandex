export const chat: string = `<div class="chat row fullContainer">

  <div class="chat__listChat"><ListChat /></div>
  <div class="fullContainer chat__screen"><ScreenChat /></div>
  <div class="chat__profileChat">
    <div class="chat__iSetting {{classIcon}}" @click="handlerClick">
      {% if isProfileChat %}
        <img src="{{ iSetting }}" alt=" " />
      {% else %}
        <img src="{{ iProfileChat }}" alt=" " />
      {% endif %}
    </div>
    {% if isProfileChat %}
      <ProfileChat />
    {% else %}
      <SettingsChat />
    {% endif %}
  </div>

  </div>
`;
