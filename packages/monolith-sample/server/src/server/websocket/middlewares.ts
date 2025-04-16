import type { IncomingMessage } from "node:http";
import type { Duplex } from "node:stream";

import { wss } from ".";
import { Jwt } from "../../common/libs/Jwt";
import { env } from "../../env";
import { getQueryParamFromUrl } from "./utils";

export const ensureWebsocketAuthentication = (
	request: IncomingMessage,
	socket: Duplex,
	head: Buffer,
) => {
	try {
		const token = getQueryParamFromUrl(request.url || "", "token");

		if (!token) {
			throw new Error("Missing token");
		}

		const jwt = new Jwt(env.JWT_SECRET);

		const { id } = jwt.decrypt(token);

		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit("connection", ws, request, id);
		});
	} catch {
		socket.destroy();
	}
};
