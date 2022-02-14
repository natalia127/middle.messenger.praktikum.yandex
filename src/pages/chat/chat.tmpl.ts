export const chat: string = `<div class="chat row fullContainer">

  <div class="chat__listChat"><ListChat /></div>
  <div class="fullContainer chat__screen"><ScreenChat /></div>
  <div class="chat__profileChat">
    <div class="chat__iSetting {{classIcon}}" @click="handlerClick">

        <img t-if="isProfileChat" src="{{ iSetting }}" alt=" " />

        <img t-else=" " src="{{ iProfileChat }}" alt=" " />

    </div>
    <div t-if="isProfileChat" class="chat__infoChat">
      <ProfileChat />
    </div>
    <div t-else=" " class="chat__infoChat">
      <SettingsChat />
    </div>
  </div>

  </div>
`;
