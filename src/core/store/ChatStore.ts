import { Store } from './StoreBase';

type TState = {
  chats: {
    id: number,
    title: string,
    avatar: null | string,
    unread_count: number,
    last_message: null | string,
    created_by: number
  }[],
  chatsUser: {
    [key: number]: {}
  },
  chatsConnect: {
    [key: number]: WebSocket
  }
  chatsMessages: {
    [key: number]: []
  }
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
