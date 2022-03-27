import config from 'config';
import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';

let db: PrismaClient;

export function connect() {
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
