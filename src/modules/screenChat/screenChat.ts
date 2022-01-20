import { Input } from '../../components/input/input.tmpl';
import { Block } from '../../core/Block';
import { screenChat } from './screenChat.tmpl';
import { propsAndChildren } from '../../core/typeBlock';

class ScreenChat extends Block {
  constructor(props: propsAndChildren) {
    super(props);
  }

  render() {
    return screenChat;
  }
}

export default ()=> (new ScreenChat({
  Input: new Input({
    placeholder: 'Написать сообщение',
    class: 'chat__print',
    type: 'text'
  })
}));
