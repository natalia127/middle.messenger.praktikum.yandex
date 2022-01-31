import { Input } from '../../components/input/input';
import { Block } from '../../core/Block';
import { TPropsAndChildren } from '../../core/typeBlock';
import { listChatTmpl } from './listChat.tmpl';
import { ItemChat } from './itemChat/itemChat';
import { mockListChatTs } from './mockListChat';
const itemsChat = mockListChatTs.map(item => new ItemChat(item));

class ListChat extends Block {
  constructor(props: TPropsAndChildren) {
    super(props);
  }

  render(): string {
    return listChatTmpl;
  }
}

export default ()=> (new ListChat({
  itemsChat,
  input: new Input({
    placeholder: 'имя чата',
    class: 'listChat__search',
    type: 'search',
    name: 'message'
  })
}));
