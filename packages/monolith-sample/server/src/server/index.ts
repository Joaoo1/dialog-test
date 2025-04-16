import { createServer } from "node:http";
import { env } from "../env";
import { app } from "./app";
import { ensureWebsocketAuthentication } from "./websocket/middlewares";

const server = createServer(app);

server.on("upgrade", ensureWebsocketAuthentication);

server.listen(env.PORT, () => {
	console.log(`Server is running on port ${env.PORT}`);
});
