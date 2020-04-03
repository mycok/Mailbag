import ImapClient from 'emailjs-imap-client';
import { ParsedMail, simpleParser } from 'mailparser';

import { IServerInfo } from '../interfaces/IServerInfo';
import { IMailboxParams } from '../interfaces/IMailboxParams';
import { IMailbox } from '../interfaces/IMailbox';
import { IMessage } from '../interfaces/IMessage';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export class Worker {
  private static serverInfo: IServerInfo;
  constructor(withServerInfo: IServerInfo) {
    Worker.serverInfo = withServerInfo;
  }

  private async connectToServer(): Promise<any> {
    const client: any = new ImapClient.default(
          Worker.serverInfo.imap.host,
          Worker.serverInfo.imap.port,
          { auth: Worker.serverInfo.imap.auth },
      );
    client.logLevel = client.LOG_LEVEL_NONE;
    client.onError = (error: Error) => {
      console.log('IMAP.Worker.listMailBoxes(): connection error', error);
    };

    await client.connect();
    return client;
  }

  public async listMailboxes(): Promise<IMailbox[]> {
    const client: any = await this.connectToServer();
    const mailboxes: any = await client.listMailBoxes();
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
        forMailbox.mailboxName, '1:*', ['uid', 'envelope'],
    );

    await client.close();

    const filteredMessages: IMessage[] = [];
    messages.forEach((message: any) => {
      filteredMessages.push({
        messageId: message.id,
        date: message.envelope.date,
        from: message.envelope.from[0].address,
        subject: message.envelope.subject,
      });
    });

    return filteredMessages;
  }

  public async getMessageBody(forMailbox: IMailboxParams): Promise<string | undefined> {
    const client: any = await this.connectToServer();
    const messages: any[] = await client.listMessages(
      forMailbox.mailboxName, forMailbox.messageId, ['body[]'], { byUid: true }
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
