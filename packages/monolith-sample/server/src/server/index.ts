import { createServer } from "node:http";
import { env } from "../env";
import { app } from "./app";
import { setupWsServer } from "./websocket";

const server = createServer(app);

setupWsServer(server);

server.listen(env.PORT, () => {
	console.log(`Server is running on port ${env.PORT}`);
});
