const imapClient = require('emailjs-imap-client').default;
import { ParsedMail, simpleParser } from 'mailparser';

import { IServerInfo } from '../ServerInfo';
import { logger } from '../utils/logger';

export interface IMailbox {
  name: string;
  path: string;
}

export interface IMailboxParams {
  mailboxName: string;
  messageId?: number;
}

export interface IMessage {
  messageId: string;
  date: string;
  from: string;
  to?: string;
  subject: string;
  body?: string;
  flags?: string[];
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export class Engine {
  private static serverInfo: IServerInfo;

  constructor(withServerInfo: IServerInfo) {
    Engine.serverInfo = withServerInfo;
  }

  private async connectToServer(): Promise<any> {
    const client: any = new imapClient(Engine.serverInfo.imap.host, Engine.serverInfo.imap.port, {
      auth: Engine.serverInfo.imap.auth,
      useSecureTransport: true,
    },
      );
    client.logLevel = client.LOG_LEVEL_NONE;
    client.onError = (error: Error) => {
      logger.error('IMAP.Engine.listMailBoxes(): connection error', error);
    };

    await client.connect();
    return client;
  }

  public async listMailboxes(): Promise<IMailbox[]> {
    const client: any = await this.connectToServer();
    const mailboxes: any = await client.listMailboxes();
    await client.close();

    const filteredMailboxes: IMailbox[] = [];
    const iterateChildren: Function = (mailboxArray: any[]):void => {
      mailboxArray.forEach((mailbox: any) => {
        filteredMailboxes.push({ name: mailbox.name, path: mailbox.path });
        iterateChildren(mailbox.children);
      });
    };
    iterateChildren(mailboxes.children);

    return filteredMailboxes;
  }

  public async listMessages(forMailbox:IMailboxParams):Promise<IMessage[]> {
    const client: any = await this.connectToServer();
    const mailbox: any = await client.selectMailbox(forMailbox.mailboxName);

    if (mailbox.exists === 0) {
      await client.close();
      return [];
    }

    const messages: any[] = await client.listMessages(
        forMailbox.mailboxName, '1:10', ['uid', 'flags', 'envelope'],
    );

    await client.close();

    const filteredMessages: IMessage[] = [];
    messages.forEach((message: any) => {
      filteredMessages.push({
        flags: message.flags,
        messageId: message.uid,
        date: message.envelope.date,
        from: message.envelope.from[0].address,
        to: message.envelope.to[0].address,
        subject: message.envelope.subject,
      });
    });

    return filteredMessages;
  }

  public async getMessageBody(forMailbox: IMailboxParams): Promise<string | undefined> {
    const client: any = await this.connectToServer();
    const messages: any[] = await client.listMessages(
      forMailbox.mailboxName, forMailbox.messageId, ['body[]'], { byUid: true },
    );
    const parsed: ParsedMail = await simpleParser(messages[0]['body[]']);
    await client.close();

    return parsed.text;
  }

  public async deleteMessage(forMailbox: IMailboxParams): Promise<any> {
    const client: any = await this.connectToServer();
    await client.deleteMessages(forMailbox.mailboxName, forMailbox.messageId, { byUid: true });
    await client.close();
  }
}
