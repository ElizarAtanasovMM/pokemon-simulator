import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import path from 'node:path';
import homeRouter from './routes/home';
import simulateRouter from './routes/simulate';

declare global {
  var appRoot: string;
}

// Set global appRoot variable so it can be used in utilities;
global.appRoot = path.resolve(__dirname);

const app = express();

app.use(express.json());
app.use('/', homeRouter);
app.use('/simulate', simulateRouter);
// All other routes except index
app.use(errorHandler);

export default app;
