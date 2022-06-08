import { Store } from './StoreBase';
import { TUserDate } from './typeStoreDate';
type TMessage = {
  chat_id: number,
  content: string
  file: null
  id: number
  is_read: boolean
  time: string
  type: 'message'
  user_id: number
}
type TState = {
  chats: {
    id: number,
    title: string,
    avatar: null | string,
    unread_count: number,
    last_message: null | TMessage,
    created_by: number
  }[],
  chatsUser: Record<number, TUserDate[]>,
  chatsConnect: Record<number, WebSocket>
  chatsMessages: Record<number, TMessage[]>
  errorGetChats: boolean
}
export class ChatStore extends Store {
  protected state: TState = {
    chats: [],
    chatsUser: {

    },
    chatsConnect: {},
    errorGetChats: false,
    chatsMessages: {

    }

  };

  getState() {
    return this.state;
  }
}

export const chatStore = new ChatStore();
