import { io } from 'socket.io-client';

export enum WebSocketEvents {
  NEW_POST = 'NEW_POST',
}

export const socket = io(import.meta.env.VITE_SOCKET_BASE_URL);
