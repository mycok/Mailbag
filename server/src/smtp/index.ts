import mailer from 'nodemailer/lib/mailer';
import nodemailer,  { SendMailOptions, SentMessageInfo } from 'nodemailer';

import { IServerInfo } from '../ServerInfo';

export class Engine {
  private static serverInfo: IServerInfo;
  constructor(withServerInfo: IServerInfo) {
    Engine.serverInfo = withServerInfo;
  }

  public async sendMessage(withOptions: SendMailOptions) {
    const transport: mailer = nodemailer.createTransport(Engine.serverInfo.smtp);
    try {
      const info = await transport.sendMail(withOptions);
      return info.messageId;
    } catch (error) {
      console.log(error);
    }
  }
}
