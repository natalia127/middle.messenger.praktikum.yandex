import { userStore } from '../store/UserStore';
import { EPATH } from '../router/namePath';
import { router } from '../router/initRouter';
import { UserAPI } from '../api/userApi';
import { TChangeUser, TChangePassword, TSearchUser } from '../typeDate';
function setUserStore(response: object) {
  const responseEntries = Object.entries(response);
  responseEntries.forEach(([key, value], index) => {
    userStore.set(key, value, index === responseEntries.length - 1);
  });
}

class UserController {
  API = new UserAPI();

  public changeUser(data: TChangeUser) {
    this.API.changeUser(data).then((result) => {
      if (result.status === 200) {
        const response = JSON.parse(result.response);

        setUserStore(response);

        router.go(EPATH.PROFILE);
      } else {
        const response = JSON.parse(result.response);
        userStore.set('errorMessageChange', response.error);
      }
    });
  }

  public changePassword(data: TChangePassword) {
    const payload: Partial<TChangePassword> = {};
    payload.oldPassword = data.oldPassword;
    payload.newPassword = data.newPassword;
    this.API.changePassword(payload).then((result) => {
      if (result.status === 200) {
        router.go(EPATH.PROFILE);
      }
    });
  }

  changeAvatar(file: File) {
    this.API.changeAvatar(file).then((result) => {
      if (result.status === 200) {
        const response = JSON.parse(result.response);
        setUserStore(response);
      }
    });
  }

  public async searchUser(data: TSearchUser) {
    await this.API.searchUser(data).then((result) => {
      if (result.status === 200) {
        const response = JSON.parse(result.response);

        userStore.set('resultSearchUser', response[0]);
      } else {
        return false;
      }
    });
  }
}

export const userController = new UserController();
