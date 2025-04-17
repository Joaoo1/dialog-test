import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { env } from '../env';
import { app } from './app';

const server = createServer(app);

export const io = new Server(server, { cors: { origin: '*' } });

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
