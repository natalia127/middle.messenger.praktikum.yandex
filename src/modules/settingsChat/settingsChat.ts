import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';
import { settingsChat } from './settingsChat.tmpl';

export class SettingsChat extends Block {
  constructor(props: TPropsObject) {
    super({ data: props });
  }

  render() {
    return settingsChat;
  }
}
