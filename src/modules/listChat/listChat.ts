import { Input } from '../../components/input/input.tmpl';
import { Block } from '../../core/Block';
import { propsAndChildren } from '../../core/typeBlock';
import { listChatTmpl } from './listChat.tmpl';

class ListChat extends Block {
  constructor(props: propsAndChildren) {
    super(props);
  }

  render(): string {
    return listChatTmpl;
  }
}

export default ()=> (new ListChat({
  input: new Input({
    placeholder: 'имя чата',
    class: 'listChat__search',
    type: 'search',
    name: 'message'
  })
}));
