import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { initApolloServer } from './graphql';
import { corsOptions } from './config/cors';
import { helmetOptions } from './config/helmet';

const app = express();

app.use(helmet(helmetOptions));

app.use(cors(corsOptions));

initApolloServer(app);

export { app };
