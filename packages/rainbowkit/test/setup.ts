import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Replace the global WebSocket with an inert stub. The real implementation
// (undici 7's WebSocket under jsdom 29) dispatches Events whose class identity
// doesn't match Node's native EventTarget, throwing a synchronous TypeError
// from inside @walletconnect/core's relayer connect path. Tests don't exercise
// real WC sessions, so a no-op socket that never reaches undici is the
// simplest fix.
class StubWebSocket extends EventTarget {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  readonly CONNECTING = 0;
  readonly OPEN = 1;
  readonly CLOSING = 2;
  readonly CLOSED = 3;
  readyState = StubWebSocket.CLOSED;
  bufferedAmount = 0;
  extensions = '';
  protocol = '';
  binaryType: 'arraybuffer' | 'blob' = 'blob';
  onopen: ((this: WebSocket, ev: Event) => unknown) | null = null;
  onclose: ((this: WebSocket, ev: CloseEvent) => unknown) | null = null;
  onerror: ((this: WebSocket, ev: Event) => unknown) | null = null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => unknown) | null = null;
  constructor(public url: string) {
    super();
  }
  close() {}
  send() {}
}
Object.assign(globalThis, { WebSocket: StubWebSocket });

afterEach(() => {
  cleanup();
});
