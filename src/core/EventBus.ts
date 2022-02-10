export type TListener<T extends unknown[] = any[]> = (...args: T) => void
export class EventBus<E extends string = string,
  M extends { [K in E]: unknown[]} = Record<E, any[]>> {
  private listeners: { [key in E]?: TListener<M[E]>[]} = {};

  constructor() {
    this.listeners = {};
  }

  on(event: E, callback: TListener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off(event: E, callback: TListener<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    );
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]?.forEach((listener) => {
      listener(...args);
    });
  }
}
