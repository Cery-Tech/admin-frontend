export class EventSubscription<T extends unknown[]> {
  private _subscribers = new Set<(...args: T) => void>();

  subscribe = (callback: (...args: T) => void) => {
    this._subscribers.add(callback);

    return {
      unsubscribe: () => this._subscribers.delete(callback),
    };
  };

  unsubscribe = (callback: () => void) => {
    this._subscribers.delete(callback);
  };

  clear = () => {
    this._subscribers.clear();
  };

  handle = (...args: T) => {
    this._subscribers.forEach((cb) => cb(...args));
  };

  get subList() {
    return this._subscribers;
  }
}
