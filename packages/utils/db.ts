import config from 'config';
import Logger from './logging';
import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';

let db: PrismaClient;
const logger = Logger('utils/database');

export function connect() {
  logger.log('Connecting to database');
  db = new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://${userInfo().username}:${(<any>config.db).password}@${config.db.host}:${config.db.port}/${config.db.database}`,
      },
    },
  });
}

export function database(): PrismaClient {
  return db;
}

export const isDbConnected = () => !!db;
