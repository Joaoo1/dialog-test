import { EventEmitter } from "node:events";
import { WebSocketServer } from "ws";
import { WebSocketEvents } from "./events";

const wss = new WebSocketServer({
	noServer: true, // Websocket will be called from httpServer on upgrade event
});

export const wsEventEmitter = new EventEmitter();

wss.on("connection", (ws) => {
	wsEventEmitter.on(WebSocketEvents.NEW_POST, (pst) => {
		ws.send(JSON.stringify({ event: WebSocketEvents.NEW_POST }));
	});
});

export { wss };
