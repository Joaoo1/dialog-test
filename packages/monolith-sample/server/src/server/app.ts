import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';
import { ExceptionHandler } from './middlewares/ExceptionHandler';
import { generalRateLimiter } from './middlewares/RateLimiter';
import { router } from './router';

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use(generalRateLimiter);

app.use(router);

app.use(ExceptionHandler);

export { app };
