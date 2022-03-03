import { Store } from './StoreBase';
import { TUserDate } from './typeStoreDate';

type TState = TUserDate & {resultSearchUser: TUserDate}
export class UserStore extends Store {
  state: TState = {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    phone: '',
    display_name: '',
    id: null,
    avatar: null,
    errorMessageChange: '',
    resultSearchUser: {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      display_name: '',
      id: null,
      avatar: null,
      errorMessageChange: ''
    }
  };

  getState() {
    return this.state;
  }
}

export const userStore = new UserStore();
