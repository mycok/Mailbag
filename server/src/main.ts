import path from 'path';
import express, { Express, Request, Response, NextFunction, response } from 'express';

import { serverInfo } from './ServerInfo';
import * as IMAP from './IMAP';
import * as SMTP from './SMTP';
import * as Contacts from './Contacts';
import { IContact } from './Contacts';

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
        const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
        res.json(mailboxes);
    } catch (error) {
       res.send('error');
    }
});

app.get('/mailboxes/:mailbox', async (req:Request, res:Response) => {
    const { params: { mailbox } } = req;
    try {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const messages: IMAP.IMessage[] = await imapWorker.listMessages({ mailbox: mailbox });
        res.json(messages);
    } catch (error) {
        res.send('error');
    }
});

app.get('/messages/:mailbox/:id', async (req:Request, res:Response) => {
    const { params: { mailbox, id } } = req;
    try {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        const messageBody: IMAP.IMessage[] = await imapWorker.getMessageBody({ mailbox: mailbox, id: parseInt(id, 10) });
        res.send(messageBody);
    } catch (error) {
        res.send('error');
    }
})

app.delete('/messages/:mailbox/:id', async (req:Request, res:Response) => {
    const { params: { mailbox, id } } = req;
    try {
        const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
        await imapWorker.deleteMessage({ mailbox: mailbox, id: parseInt(id, 10) });
        res.send('ok');
    } catch (error) {
        res.send('error');
    }
});

app.post('/messages', async (req:Request, res:Response) => {
    const { body } = req;
    try {
        const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
        await smtpWorker.sendMessage({ message: body });
        res.json('ok');
    } catch (error) {
        res.send('error');
    }
});
