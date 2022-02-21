import { chatStore } from '../store/ChatStore';
import { ChatAPI } from '../api/chatApi';
import {
  TDelUsersChat, TAddChat, TAddUserChat, TDelChat, TChangeAvatarChat
} from '../typeDate';

class ChatController {
  API = new ChatAPI();

  public getChat() {
    this.API.getChat().then((result) => {
      if (result.status === 200) {
        const response = JSON.parse(result.response);
        chatStore.set('chats', response);
        if (chatStore.getState().errorGetChat) {
          chatStore.set('errorGetChat', false);
        }
      } else {
        chatStore.set('errorGetChat', true);
      }
    });
  }

  public async addChat(data: TAddChat) {
    return this.API.addChat(data).then((result) => {
      if (result.status === 200) {
        const response = JSON.parse(result.response);
        const chats = chatStore.getState().chats;
        chats.push({
          id: response.id,
          title: data.title,
          avatar: null,
          unread_count: 0,
          last_message: null,
          created_by: 0
        });
        chatStore.set('chats', chats);
        return true;
      }
      return false;
    }).catch(()=>{
      return false;
    });
  }

  public getUsersChat(id: number) {
    if (chatStore.getState().chatsUser[id]) {
      return true;
    }

    return this.updateUserChat(id);
  }

  updateUserChat(id: number) {
    return this.API.getUserChat(id).then((result) => {
      const response = JSON.parse(result.response);

      if (result.status === 200) {
        chatStore.set(`chatsUser.${id}`, response);
        return true;
      }
      return false;
    });
  }

  public addUsersChat(data: TAddUserChat) {
    return this.API.addUserChat(data).then((result) => {
      if (result.status === 200) {
        this.updateUserChat(data.chatId);
        return true;
      }
      return false;
    });
  }

  public delUsersChat(data: TDelUsersChat) {
    return this.API.delUserChat(data).then((result) => {
      if (result.status === 200) {
        this.updateUserChat(data.chatId);
        return true;
      }
      return false;
    });
  }

  public async delChat(data: TDelChat) {
    const isSuccess = await this.API.delChat(data).then((result) => {
      if (result.status === 200) {
        return true;
      }
      return false;
    });
    return isSuccess;
  }

  changeAvatar(data: TChangeAvatarChat) {
    this.API.changeAvatar(data).then((result) => {
      if (result.status === 200) {
        const response = JSON.parse(result.response);
        const idPathChat = chatStore.getState().chats.findIndex((chat)=> chat.id === data.idChat);
        Object.entries(response).forEach(([key, value]) => {
          chatStore.set(`chats[${idPathChat}].${key}`, value);
        });
        // setUserStore(response);
      }
    });
  }
}

export const chatController = new ChatController();
