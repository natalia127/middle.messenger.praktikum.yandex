export const chat: string = `<div class="chat row fullContainer" 
@addChat="showAddChat" 
@selectChat="selectChat"
@addUserChat="showAddUserChat"
@hideModal="hideModal"
@delUserChat="showDelUserChat"
@delChat="showDelChat"
>
  <div t-if="needBlackout" @click="hideModal">
    <Blackout />
  </div>
  <div class="chat__listChat"><ListChat /></div>
  <div class="fullContainer chat__wrapper-screen">
    <div class="chat__screen" t-if="idActiveChat">
      <ScreenChat ::idChat=idActiveChat/>
    </div>
    <div  t-else="" class="chat__choice">Выберите чат чтобы отправить сообщение</div>
  </div>
  <div t-if="idActiveChat" class="chat__profileChat">
    <div class="chat__iSetting {{classIcon}}" @click="changeScreenInfoChat">
        <img t-if="isProfileChat" src="{{ iSetting }}" alt=" " />
        <img t-else=" " src="{{ iProfileChat }}" alt=" " />
    </div>
    <div t-if="isProfileChat" class="chat__infoChat">
      <ProfileChat ::idChat=idActiveChat />
    </div>
    <div t-else=" " class="chat__infoChat">
      <SettingsChat ::idChat=idActiveChat/>
    </div>
  </div>
  <div class="chat__addChat" t-if="needAddChat">
    <AddChat />
  </div>
  <div class="chat__addChat" t-if="needAddUserChat">
    <AddUserChat ::idActiveChat=idActiveChat />
  </div>
  <div class="chat__addChat" t-if="needDelUserChat">
    <DelUserChat ::idActiveChat=idActiveChat ::login=loginDelChat ::idDelUser=idDelUser />
  </div>
  <div class="chat__addChat" t-if="needDelChat">
    <DelChat ::idActiveChat=idActiveChat ::nameChat=nameActiveChat />
  </div>
  </div>
`;
