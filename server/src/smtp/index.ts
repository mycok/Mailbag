import mailer from 'nodemailer/lib/mailer';
import nodemailer,  { SendMailOptions, SentMessageInfo } from 'nodemailer';
// import   { SendMailOptions, SentMessageInfo } from 'nodemailer';

import { IServerInfo } from '../interfaces/IServerInfo';

// const nodemailer = require('nodemailer');

export class Worker {
  private static serverInfo: IServerInfo;
  constructor(withServerInfo: IServerInfo) {
    Worker.serverInfo = withServerInfo;
  }

  public async sendMessage(withOptions: SendMailOptions) {
    const transport: mailer = nodemailer.createTransport(Worker.serverInfo.smtp);
    try {
      const info = await transport.sendMail(withOptions);
      return info.messageId;
    } catch (error) {
      console.log(error);
    }
  }
}

