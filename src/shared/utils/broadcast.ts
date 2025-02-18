export class BroadcastUpdates<DataType> {
  private channel: BroadcastChannel;

  private listeners: ((data: DataType) => void)[] = [];

  constructor(channelName: string) {
    this.channel = new BroadcastChannel(channelName);

    this.channel.onmessage = (event: MessageEvent<DataType>) => {
      if (WindowFocus.focused) {
        return;
      }

      this.listeners.forEach((listener) => listener(event.data));
    };
  }

  postUpdate = (data: DataType) => {
    this.channel.postMessage(data);
  };

  addMessageListener = (listener: (data: DataType) => void) => {
    this.listeners.push(listener);

    return {
      unsubscribe: () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      },
    };
  };
}

export class WindowFocus {
  private static _focused = false;

  private static listeners: ((focused: boolean) => void)[] = [];

  private static initialized = false;

  static init = () => {
    this._focused = document?.hasFocus() ?? false;
    if (this.initialized) {
      return;
    }
    window.addEventListener('focus', () => {
      this._focused = true;
      this.listeners.forEach((listener) => listener(true));
    });

    window.addEventListener('blur', () => {
      this._focused = false;
      this.listeners.forEach((listener) => listener(false));
    });

    this.initialized = true;
  };

  static addListener = (listener: (focused: boolean) => void) => {
    this.listeners.push(listener);

    return {
      unsubscribe: () => {
        this.listeners = this.listeners.filter((l) => l !== listener);
      },
    };
  };

  static get focused() {
    return this._focused;
  }
}
