import app from './app';
import config from './config/config';
import { initConnection, initDatabase } from './utils/database/databaseUtils';

const start = async () => {
  await initConnection();

  await initDatabase();
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
};

start();
