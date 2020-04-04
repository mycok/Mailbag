import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';

import { mailboxRouter } from './routes/mailboxes';
import { contactsRouter } from './routes/contacts';

export const app: Express = express();

app.use(express.json());
app.use((req:Request, res:Response, next:NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', express.static(path.join(__dirname, '../../client/dist')));
app.use(mailboxRouter);
app.use(contactsRouter);
