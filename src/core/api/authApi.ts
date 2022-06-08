import { apiInstanceYaPracticum } from '../http/http';
import { EHandsAuth } from './listHands';
import { TSignUp, TSignIn } from '../typeDate';
import { BaseAPI } from './BaseApi';
export class AuthAPI extends BaseAPI {
  getUser() {
    return apiInstanceYaPracticum.get(EHandsAuth.GETUSER);
  }

  signUp(data: TSignUp) {
    return apiInstanceYaPracticum.post(EHandsAuth.SIGNUP, {
      data: JSON.stringify(data)
    });
  }

  signIn(data: TSignIn) {
    return apiInstanceYaPracticum.post(EHandsAuth.SIGNIN, {
      data: JSON.stringify(data)
    });
  }

  logout() {
    return apiInstanceYaPracticum.post(EHandsAuth.LOGOUT);
  }
}
