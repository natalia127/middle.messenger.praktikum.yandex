import { apiInstanceYaPracticum } from '../http/http';
import { EHandsUser } from './listHands';
import { TChangeUser, TChangePassword, TSearchUser } from '../typeDate';
import { BaseAPI } from './BaseApi';

export class UserAPI extends BaseAPI {
  changeUser(data: TChangeUser) {
    return apiInstanceYaPracticum.put(EHandsUser.CHANGE_PROFILE, {
      data: JSON.stringify(data)
    });
  }

  changePassword(data: TChangePassword) {
    return apiInstanceYaPracticum.put(EHandsUser.CHANGE_PASSWORD, {
      data: JSON.stringify(data)
    });
  }

  changeAvatar(data: File) {
    const formdata = new FormData();
    formdata.append('avatar', data);
    return apiInstanceYaPracticum.put(EHandsUser.CHANGE_AVATAR, {
      data: formdata
    });
  }

  searchUser(data: TSearchUser) {
    return apiInstanceYaPracticum.post(EHandsUser.SEARCH_USER, {
      data: JSON.stringify(data)
    });
  }
}
