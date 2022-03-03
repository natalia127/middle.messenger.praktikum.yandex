import { authStore } from '../core/store/AuthStore';
import { StoreEvents } from '../core/store/StoreBase';
import {
  TPropsObject, Constructable, IBlock
} from '../core/block/typeBlock';
export function getWithAuth(Component: Constructable<IBlock>) {
  return class extends Component {
    constructor(props: TPropsObject) {
      const state = authStore.getState();
      const newProps = { ...props, ...state };
      super(newProps);

      authStore.on(StoreEvents.Updated, () => {
        this.setProps({ ...authStore.getState() });
      });
    }
  };
}
