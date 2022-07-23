/* eslint-disable no-console */
import { app } from './app';

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listen on port ${port}`));
