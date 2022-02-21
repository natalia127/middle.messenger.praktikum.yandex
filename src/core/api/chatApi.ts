import { apiInstanceYaPracticum } from '../http/http';
import { EHandsChat } from './listHands';
import {
  TDelUsersChat, TAddChat, TAddUserChat, TDelChat, TChangeAvatarChat
} from '../typeDate';
export class ChatAPI {
  getChat() {
    return apiInstanceYaPracticum.get(EHandsChat.GET_CHAT);
  }

  addChat(data: TAddChat) {
    return apiInstanceYaPracticum.post(EHandsChat.CREATE_CHAT, {
      data: JSON.stringify(data)
    });
  }

  getUserChat(id: number) {
    return apiInstanceYaPracticum.get(`/chats/${id}/users`);
  }

  addUserChat(data: TAddUserChat) {
    return apiInstanceYaPracticum.put('/chats/users', {
      data: JSON.stringify(data)
    });
  }

  delUserChat(data: TDelUsersChat) {
    return apiInstanceYaPracticum.delete('/chats/users', {
      data: JSON.stringify(data)
    });
  }

  delChat(data: TDelChat) {
    return apiInstanceYaPracticum.delete('/chats', {
      data: JSON.stringify(data)
    });
  }

  changeAvatar(data: TChangeAvatarChat) {
    const formdata = new FormData();
    formdata.append('avatar', data.file);
    formdata.append('chatId', data.chatId);
    return apiInstanceYaPracticum.put('/chats/avatar', {
      data: formdata
    });
  }
}
