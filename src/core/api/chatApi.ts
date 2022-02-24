import { apiInstanceYaPracticum } from '../http/http';
import { EHandsChat } from './listHands';
import {
  TDelUsersChat, TAddChat, TAddUserChat, TDelChat, TChangeAvatarChat
} from '../typeDate';
export class ChatAPI {
  getChats() {
    return apiInstanceYaPracticum.get(EHandsChat.GET_CHATS);
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

  getTokenChat(id: number) {
    return apiInstanceYaPracticum.post(`/chats/token/${id}`, {
      data: JSON.stringify({ id })
    });
  }

  async connectMessaging(data: {
    userId: number,
    chatId: number,
    tokenValue: string
  }) {
    const socket = await new WebSocket(`wss://ya-praktikum.tech/ws/chats/${data.userId}/${data.chatId}/${data.tokenValue}`);

    return socket;
  }
}
