import { EventSubscription } from '@/shared/utils/subscriptions';

export enum WsBodyType {
  JSON = 'json',
  ArrayBuffer = 'arraybuffer',
  Blob = 'blob',
}

export type WsSendBody<Type extends WsBodyType, Data> = {
  type: Type;
  data: Data;
};

// type HelperCallbacks<MessageTypes> = {
//   onMessage: (message: MessageTypes) => void;
//   onBlob?: (blob: Blob) => void;
//   onArrayBuffer?: (buffer: ArrayBuffer) => void;
// };

type DataEvent<T> = [T, MessageEvent];

type PureEvent = [Event];

export class WebSocketHelper<SendMessageTypes, RecievedMessageTypes> {
  private _ws: WebSocket;

  private jsonSub = new EventSubscription<DataEvent<RecievedMessageTypes>>();
  private bufferSub = new EventSubscription<DataEvent<ArrayBuffer>>();
  private blobSub = new EventSubscription<DataEvent<Blob>>();

  private errorSub = new EventSubscription<PureEvent>();
  private closeSub = new EventSubscription<PureEvent>();

  constructor(socketInstance: WebSocket, onOpen?: (ev: Event) => void) {
    this._ws = socketInstance;
    this._ws.onmessage = (ev) => {
      if (ev.type === 'message') {
        const data = JSON.parse(ev.data);

        this.jsonSub.handle(data, ev);

        return;
      }
      if (ev.type === 'blob') {
        this.blobSub.handle(ev.data, ev);

        return;
      }

      if (ev.type === 'arraybuffer') {
        this.bufferSub.handle(ev.data, ev);

        return;
      }
    };

    this._ws.onerror = (ev) => {
      this.errorSub.handle(ev);
    };

    this._ws.onclose = (ev) => {
      this.closeSub.handle(ev);
    };
    if (onOpen) {
      this._ws.onopen = onOpen;
    }
  }

  get ws() {
    return this._ws;
  }

  send = <Type extends WsBodyType>(body: WsSendBody<Type, SendMessageTypes>) => {
    switch (body.type) {
      case WsBodyType.JSON: {
        this.sendJson(body.data);

        return;
      }
      case WsBodyType.Blob: {
        this.sendBlod(body.data as Blob);

        return;
      }
      case WsBodyType.ArrayBuffer: {
        this.sendArrayBuffer(body.data as ArrayBuffer);

        return;
      }
      default:
        return;
    }
  };

  sendJson = (data: SendMessageTypes) => {
    if (data instanceof Blob || data instanceof ArrayBuffer) {
      throw new Error(
        'Invalid data type. You provide and Blob or ArrayBuffer type. Please, use corresponding methods to send this type of data'
      );
    }

    const jsonString = JSON.stringify(data);

    this._ws.send(jsonString);
  };

  sendBlod = (data: Blob) => {
    if (!(data instanceof Blob)) {
      throw new Error('Invalid data type. The body.data type should be a Blob');
    }
    this._ws.send(data);

    return;
  };

  sendArrayBuffer = (data: ArrayBufferLike | ArrayBufferView) => {
    if (!(data instanceof ArrayBuffer)) {
      throw new Error('Invalid data type. The body.data type should be an ArrayBuffer');
    }
    this._ws.send(data);

    return;
  };

  close = ({ code, reason }: { code?: number; reason?: string } = {}) => {
    this._ws.close(code, reason);
  };

  get errorEvent() {
    return this.errorSub;
  }

  get closeEvent() {
    return this.closeSub;
  }

  get jsonEvent() {
    return this.jsonSub;
  }

  get blobEvent() {
    return this.blobSub;
  }

  get bufferEvent() {
    return this.bufferSub;
  }

  clearAllListeners = () => {
    this.jsonSub.clear();
    this.bufferSub.clear();
    this.blobSub.clear();
    this.errorSub.clear();
    this.closeSub.clear();
  };
}
