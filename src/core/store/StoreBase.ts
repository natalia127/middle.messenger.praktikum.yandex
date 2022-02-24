import { EventBus } from '../EventBus';
import { set, setLink } from '../utils/mydash';

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  protected state = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }

  public clear() {
    Object.keys(state).forEach((key) => {
      this.set(key, null);
    });
  }

  public setLink(path: string, value: unknown) {
    setLink(this.state, path, value);
  }
}
