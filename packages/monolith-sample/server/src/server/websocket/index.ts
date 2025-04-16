import { EventEmitter } from 'node:events';
import type { Server } from 'node:http';
import { WebSocketServer } from 'ws';
import { WebSocketEvents } from './events';

interface MyEvents {
  [WebSocketEvents.NEW_POST]: [];
}

export const wsEventEmitter = new EventEmitter<MyEvents>();

export const setupWsServer = (httpServer: Server) => {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', ws =>
    wsEventEmitter.on(WebSocketEvents.NEW_POST, () => {
      ws.send(JSON.stringify({ event: WebSocketEvents.NEW_POST }));
    })
  );
};
