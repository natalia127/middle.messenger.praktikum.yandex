import { Block } from '../../core/Block';
import { TPropsAndChildren } from '../../core/typeBlock';
import { settingsChat } from './settingsChat.tmpl';

class SettingsChat extends Block {
  constructor(props: TPropsAndChildren) {
    super(props);
  }

  render() {
    return settingsChat;
  }
}

export default ()=> (new SettingsChat({

}));
