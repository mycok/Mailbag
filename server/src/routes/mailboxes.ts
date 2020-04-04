import { Router, Request, Response } from 'express';

import { serverInfo } from '../ServerInfo';
import * as IMAP from '../imap';
import * as SMTP from '../smtp';

export const mailboxRouter = Router();

mailboxRouter.route('/messages')
.post(async (req:Request, res:Response) => {
  const { body } = req;
  try {
    const smtpEngine: SMTP.Engine = new SMTP.Engine(serverInfo);
    const info = await smtpEngine.sendMessage(body);
    res.status(200).json(info);
  } catch (error) {
    res.status(400).send('Email client error');
  }
});

mailboxRouter.route('/mailboxes')
.get(async (req:Request, res:Response) => {
  try {
    const imapEngine: IMAP.Engine = new IMAP.Engine(serverInfo);
    const mailboxes: IMAP.IMailbox[] = await imapEngine.listMailboxes();
    res.status(200).json(mailboxes);
  } catch (error) {
    res.status(500).send('Email client error');
  }
});

mailboxRouter.route('/mailboxes/:mailboxName')
.get(async (req:Request, res:Response) => {
  const { params: { mailboxName } } = req;
  try {
    const imapEngine: IMAP.Engine = new IMAP.Engine(serverInfo);
    const messages: IMAP.IMessage[] = await imapEngine.listMessages({ mailboxName });
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).send('Email client error');
  }
});

mailboxRouter.route('/messages/:mailboxName/:messageId')
.get(async (req:Request, res:Response) => {
  const { params: { mailboxName, messageId } } = req;
  try {
    const imapEngine: IMAP.Engine = new IMAP.Engine(serverInfo);
    const messageBody: IMAP.IMessage[] | any = await imapEngine.getMessageBody({
      mailboxName, messageId: parseInt(messageId, 10),
    });
    res.status(200).send(messageBody);
  } catch (error) {
    res.status(404).send('Email client error');
  }
})
.delete(async (req:Request, res:Response) => {
  const { params: { mailboxName, messageId } } = req;
  try {
    const imapEngine: IMAP.Engine = new IMAP.Engine(serverInfo);
    await imapEngine.deleteMessage({ mailboxName, messageId: parseInt(messageId, 10) });
    res.status(204).send('success');
  } catch (error) {
    res.status(404).send('Email client error');
  }
});
