import config from 'config';
import { connect } from '@nc/utils/db';
import context from './middleware/context';
import cors from 'cors';
import express from 'express';
import gracefulShutdown from '@nc/utils/graceful-shutdown';
import helmet from 'helmet';
import Logger from '@nc/utils/logging';
import security from './middleware/security';
import { router as transactionRoutes } from '@nc/domain-expense';
import { router as userRoutes } from '@nc/domain-user';
import { createServer as createHTTPServer, Server } from 'http';
import { createServer as createHTTPSServer, Server as SecureServer } from 'https';
const xss = require('xss-clean'); // no types :(

const logger = Logger('server');
// noop function to load this file into the runtime and allow express to start/db to connect
export const hook = () => logger.log('Hook function called');
const app = express();
const server: Server | SecureServer = (config.https.enabled === true) ? createHTTPSServer(config.https, app as any) : createHTTPServer(app as any);
server.ready = false;
connect();
gracefulShutdown(server);
app.use(helmet());
app.use(cors({
  origin: config.allowedOrigins,
}));

app.use(xss());
app.use(express.json({ limit: config.bodyLimit }));

app.get('/readycheck', function readinessEndpoint(req, res) {
  const status = (server.ready) ? 200 : 503;
  res.status(status).send(status === 200 ? 'OK' : 'NOT OK');
});

app.get('/healthcheck', function healthcheckEndpoint(req, res) {
  res.status(200).send('OK');
});

app.use(context);
app.use(security);

app.use('/user', userRoutes);
app.use('/expenses', transactionRoutes);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function(err, req, res, next) {
  res.status(500).json(err);
});

server.listen(config.port, () => {
  server.ready = true;
  logger.log(`Server started on port ${config.port}`);
});

export default server;
