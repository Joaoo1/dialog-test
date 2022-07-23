import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { corsOptions } from './config/cors';

const app = express();

app.use(helmet());

app.use(cors(corsOptions));

export { app };
