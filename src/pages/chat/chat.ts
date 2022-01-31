import listChat from '../../modules/listChat/listChat';
import profileChat from '../../modules/profileChat/profileChat';
import settingsChat from '../../modules/settingsChat/settingsChat';
import screenChat from '../../modules/screenChat/screenChat';
import { Block } from '../../core/Block';
import { TPropsAndChildren } from '../../core/typeBlock';

const iSetting = new URL('../../img/cog-outline.svg', import.meta.url);
const iProfileChat = new URL('../../img/account-group.svg', import.meta.url);
class Chat extends Block {
  constructor(props: TPropsAndChildren) {
    super(props);
  }

  render(): string {
    const chat: string = `<div class="chat row fullContainer">

      <div class="chat__listChat">{% listChat %}</div>
      <div class="fullContainer chat__screen">{% screenChat %}</div>
      <div class="chat__profileChat">
      <div class="js-icon chat__iSetting {{classIcon}}">
        {% if isProfileChat %}
          <img src="{{ iSetting }}" alt=" " />
        {% else %}
          <img src="{{ iProfileChat }}" alt=" " />
        {% endif %}
      </div>
      {% if isProfileChat %}
        {% profileChat %}
      {% else %}
        {% settingsChat %}
      {% endif %}
      </div>
     </div>
   `;
    return chat;
  }
}
export default ()=> (new Chat({
  listChat: listChat(),
  screenChat: screenChat(),
  profileChat: profileChat(),
  settingsChat: settingsChat(),
  iSetting: iSetting.href,
  iProfileChat: iProfileChat.href,
  classIcon: ' ',
  isProfileChat: true,
  innerEvents: [{
    selector: '.js-icon',
    click: function () {
      let isProfileChat = !this.props.isProfileChat;

      this.setProps({ isProfileChat });
    }
  }]
}));
