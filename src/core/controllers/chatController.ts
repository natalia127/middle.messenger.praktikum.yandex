import { chatStore } from '../store/ChatStore';
import { userStore } from '../store/UserStore';
import { ChatAPI } from '../api/chatApi';
import {
  TDelUsersChat, TAddChat, TAddUserChat, TDelChat, TChangeAvatarChat
} from '../typeDate';
import { BaseController } from './baseController';
class ChatController extends BaseController {
  API = new ChatAPI();

  public async joinChat(chatId: number) {
    if (chatStore.getState().chatsConnect[chatId]) {
      return true;
    }
    const result = await this.API.getTokenChat(chatId).then((r) => {
      if (r.status === 200) {
        const response = JSON.parse(r.response);
        const tokenValue = response.token;

        const userId = userStore.getState().id;

        return { userId, tokenValue };
      }
      return new Error('ошибка получения токена');
    }).then(async ({ userId, tokenValue }:{ userId: number, tokenValue: string })=>{
      const socket = await this.API.connectMessaging({ userId, chatId, tokenValue });
      await this.setListenersOnSocket(socket, chatId);
      chatStore.setLink(['chatsConnect', chatId.toString()], socket);
      this.getOldMessage(chatId, 0);
      return true;
    }).catch(()=>{
    });

    return result;
  }

  async setListenersOnSocket(socket: WebSocket, chatId: number) {
    socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', event => {
      const chatsMessages = chatStore.getState().chatsMessages;
      const dataMessage = JSON.parse(event.data);
      if (!chatsMessages[chatId]) {
        chatsMessages[chatId] = [];
      }
      if (Array.isArray(dataMessage)) {
        chatsMessages[chatId].push(...dataMessage.reverse());
      } else {
        chatsMessages[chatId].push(dataMessage);
      }

      chatStore.set('needUpdate', true);
    });

    socket.addEventListener('error', () => {
      console.log('Ошибка');
    });

    return new Promise((resolve) => {
      socket.addEventListener('open', () => {
        console.log('Соединение установлено');
        resolve(true);
      });
    });
  }

  getOldMessage(chatId: number, numberMessage: number = 0) {
    const socket = chatStore.getState().chatsConnect[chatId];

    socket.send(JSON.stringify({
      content: numberMessage,
      type: 'get old'
    }));
  }

  public getChats() {
    return this.API.getChats().then((result) => {
      if (result.status === 200) {
        const response = JSON.parse(result.response);
        chatStore.set('chats', response);
        if (chatStore.getState().errorGetChats) {
          chatStore.set('errorGetChat', false);
        }
        return true;
      }
      chatStore.set('errorGetChat', true);
      return false;
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

  // eslint-disable-next-line consistent-return
  public async getUsersChat(id: number) {
    if (chatStore.getState().chatsUser[id]) {
      return true;
    }

    await this.updateUserChat(id);
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
        const countUsersChat = chatStore.getState().chatsUser[data.chatId].length;

        if (countUsersChat > 1) {
          this.updateUserChat(data.chatId);
        }
        return true;
      }
      return false;
    });
  }

  public async delChat(data: TDelChat) {
    const isSuccess = await this.API.delChat(data).then((result) => {
      if (result.status === 200) {
        this.getChats();
        chatStore.set(`chatsUser[${data.chatId}]`, null);
        chatStore.set(`chatsConnect[${data.chatId}]`, null);
        chatStore.set(`chatsMessages[${data.chatId}]`, null);
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
        const idPathChat = chatStore.getState().chats.findIndex((chat)=> chat.id === data.chatId);
        Object.entries(response).forEach(([key, value]) => {
          chatStore.set(`chats[${idPathChat}].${key}`, value);
        });
      }
    });
  }
}

export const chatController = new ChatController();
