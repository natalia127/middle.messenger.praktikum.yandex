import listChat from '../../modules/listChat/listChat';
import profileChat from '../../modules/profileChat/profileChat.tmpl';
import settingsChat from '../../modules/settingsChat/settingsChat';
import screenChat from '../../modules/screenChat/screenChat';
import { Block } from '../../core/Block';
import { propsAndChildren } from '../../core/typeBlock';

class Chat extends Block {
  constructor(props: propsAndChildren) {
    super(props);
  }

  render(): string {
    const chat: string = `<div class="row fullContainer">
      <div class="col-lg-3">{% listChat %}</div>
      <div class="col-lg-6 fullContainer">{% screenChat %}</div>
      <div class="col-lg-3">{% settingsChat %}</div>
     </div>
   `;
    return chat;
  }
}
export default ()=> (new Chat({
  listChat: listChat(),
  screenChat: screenChat(),
  settingsChat: settingsChat()
}));
