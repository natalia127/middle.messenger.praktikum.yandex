import { authStore } from '../store/AuthStore';
import { userStore } from '../store/UserStore';
import { EPATH } from '../router/namePath';
import { router } from '../router/initRouter';
import { AuthAPI } from '../api/authApi';
import { chatController } from './chatController';
import { TSignUp, TSignIn } from '../typeDate';

class AuthController {
  API;

  constructor() {
    console.log(this);

    this.API = new AuthAPI();
  }

  public signUp(data: TSignUp) {
    this.API.signUp(data).then((result)=>{
      if (result.status === 200) {
        this.authorization();
      } else {
        const response = JSON.parse(result.response);

        authStore.set('errorMessageAuth', response.reason);
      }
    });
  }

  signIn(data: TSignIn) {
    console.log(this);

    this.API.signIn(data).then((result)=>{
      const status = result.status;
      const response = result.response;

      if (status === 200 && response === 'OK') {
        this.authorization();
      } else {
        const r = JSON.parse(result.response);
        authStore.set('errorMessageAuth', r.reason);
      }
    });
  }

  public authorization() {
    this.getUser().then((result) => {
      if (result && !authStore.getState().isAuth) {
        authStore.set('isAuth', true);
        chatController.getChats();
        router.go(EPATH.CHAT);
      }
    });
  }

  public getUser() {
    return this.API.getUser().then((result) => {
      if (result.status === 200) {
        const data = JSON.parse(result.response);
        Object.entries(data).forEach(([key, value]) => {
          userStore.set(key, value);
        });
        return true;
      }
      return false;
    });
  }

  public logout() {
    this.API.logout().then((result) => {
      if (result.status === 200) {
        if (authStore.getState().isAuth) {
          authStore.set('isAuth', false);
          router.go(EPATH.SIGNIN);
        }
        userStore.clear();
      }
    });
  }
}

export const authController = new AuthController();
