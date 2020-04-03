import path from 'path';
import express, { Express, Request, Response, NextFunction, response } from 'express';

import { serverInfo } from './ServerInfo';
import * as IMAP from './imap';
import * as SMTP from './smtp';
import * as Contacts from './Contacts';
import { IContact } from './Contacts';
import { IMailbox } from './interfaces/IMailbox';
import { IMessage } from './interfaces/IMessage';

const app: Express = express();
app.use(express.json());
app.use((req:Request, res:Response, next:NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/', express.static(path.join(__dirname, '../../client/dist')));

app.get('/mailboxes', async (req:Request, res:Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const mailboxes: IMailbox[] = await imapWorker.listMailboxes();
    res.json(mailboxes);
  } catch (error) {
    res.send('error');
  }
});

app.get('/mailboxes/:mailboxName', async (req:Request, res:Response) => {
  const { params: { mailboxName } } = req;
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messages: IMessage[] = await imapWorker.listMessages({ mailboxName });
    res.json(messages);
  } catch (error) {
    res.send('error');
  }
});

app.get('/messages/:mailboxName/:messageId', async (req:Request, res:Response) => {
  const { params: { mailboxName, messageId } } = req;
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messageBody: IMessage[] | any = await imapWorker.getMessageBody({
      mailboxName, messageId: parseInt(messageId, 10),
    });
    res.send(messageBody);
  } catch (error) {
    res.send('error');
  }
});

app.delete('/messages/:mailboxName/:messageId', async (req:Request, res:Response) => {
  const { params: { mailboxName, messageId } } = req;
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    await imapWorker.deleteMessage({ mailboxName, messageId: parseInt(messageId, 10) });
    res.send('ok');
  } catch (error) {
    res.send('error');
  }
});

app.post('/messages', async (req:Request, res:Response) => {
  const { body } = req;
  try {
    const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
    await smtpWorker.sendMessage(body);
    res.json('ok');
  } catch (error) {
    res.send('error');
  }
});
// contact endpoints
app.get('/contacts', async (req:Request, res:Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: IContact[] = await contactsWorker.listContacts();
    res.json(contacts);
  } catch (error) {
    res.send('error');
  }
});

app.post('/contacts', async (req:Request, res:Response) => {
  const { body } = req;
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact[] = await contactsWorker.createContact(body);
    res.json(contact);
  } catch (error) {
    res.send('error');
  }
});

app.delete('/contacts/:contactId', async (req:Request, res:Response) => {
  const { params: { contactId } } = req;
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    await contactsWorker.deleteContact(contactId);
    res.send('ok');
  } catch (error) {
    res.send('error');
  }
});
