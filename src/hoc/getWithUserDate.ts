import { userStore } from '../core/store/UserStore';
import { StoreEvents } from '../core/store/StoreBase';
import {
  TPropsObject, Constructable, IBlock
} from '../core/typeBlock';

export function getWithUserDate(Component: Constructable<IBlock>) {
  return class extends Component {
    constructor(props: TPropsObject) {
      const state = userStore.getState();
      const newProps = { ...props, ...state };
      super(newProps);

      userStore.on(StoreEvents.Updated, () => {
        this.setProps({ ...userStore.getState() });
      });
    }
  };
}
