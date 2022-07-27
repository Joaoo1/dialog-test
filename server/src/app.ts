import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { initApolloServer } from './graphql';
import { helmetOptions } from './config/helmet';
import { morganOptions } from './config/morgan';
import { corsOptions } from './config/cors';

const app = express();

app.use(morgan('combined', morganOptions));

app.use(helmet(helmetOptions));

app.use(cors(corsOptions));

initApolloServer(app);

export { app };
