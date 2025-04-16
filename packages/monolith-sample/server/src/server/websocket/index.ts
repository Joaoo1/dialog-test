import { EventEmitter } from "node:events";
import { WebSocketServer } from "ws";
import { WebSocketEvents } from "./events";

interface MyEvents {
	[WebSocketEvents.NEW_POST]: [];
}

export const wsEventEmitter = new EventEmitter<MyEvents>();

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
	wsEventEmitter.on(WebSocketEvents.NEW_POST, () => {
		ws.send(JSON.stringify({ event: WebSocketEvents.NEW_POST }));
	});
});

export { wss };
