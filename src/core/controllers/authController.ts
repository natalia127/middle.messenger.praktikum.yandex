import { authStore } from '../store/AuthStore';
import { userStore } from '../store/UserStore';
import { EPATH } from '../router/namePath';
import { router } from '../router/initRouter';
import { AuthAPI } from '../api/authApi';
import { chatController } from './chatController';
import { TSignUp, TSignIn } from '../typeDate';
class AuthController {
  authAPI = new AuthAPI();

  public signUp(data: TSignUp) {
    this.authAPI.signUp(data).then((result)=>{
      if (result.status === 200) {
        this.authorization();
      } else {
        const response = JSON.parse(result.response);

        authStore.set('errorMessageAuth', response.reason);
      }
    });
  }

  signIn(data: TSignIn) {
    this.authAPI.signIn(data).then((result)=>{
      const status = result.status;
      const response = result.response;

      if (status === 200 && response === 'OK') {
        this.authorization();
      } else {
        const response = JSON.parse(result.response);
        authStore.set('errorMessageAuth', response.reason);
      }
    });
  }

  public authorization() {
    this.getUser().then((result) => {
      if (result && !authStore.getState().isAuth) {
        authStore.set('isAuth', true);
        chatController.getChat();
        router.go(EPATH.CHAT);
      }
    });
  }

  public getUser() {
    return this.authAPI.getUser().then((result) => {
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
    this.authAPI.logout().then((result) => {
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
