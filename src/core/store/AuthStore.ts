import { Store } from './StoreBase';

type TState = {
  isAuth: boolean,
  errorMessageAuth: string
}
export class AuthStore extends Store {
  protected state: TState = {
    isAuth: false,
    errorMessageAuth: ''
  };

  getState() {
    return this.state;
  }
}

export const authStore = new AuthStore();
