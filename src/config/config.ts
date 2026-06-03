import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  database: {
    uri: string;
    port: number;
    name: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    uri: process.env.MONGO_URI || '',
    port: Number(process.env.MONGO_PORT) || 27017,
    name: process.env.MONGO_DB_NAME || '',
  },
};

export default config;
