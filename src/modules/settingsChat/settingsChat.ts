import { Block } from '../../core/Block';
import { propsAndChildren } from '../../core/typeBlock';
import { settingsChat } from './settingsChat.tmpl';

class SettingsChat extends Block {
  constructor(props: propsAndChildren) {
    super(props);
  }

  render() {
    return settingsChat;
  }
}

export default ()=> (new SettingsChat({

}));
