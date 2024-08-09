import { Inject, Injectable } from '@nestjs/common';
import { SendEmailProvider } from './mail.provider';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import { SendEmailHandler } from './types/sendEmailHandler.types';

@Injectable()
export class SendEmailService {
  constructor(
    @Inject(SendEmailProvider.provide)
    private readonly sendEmailProvider: nodemailer.Transporter<SentMessageInfo>,
  ) {}

  async sendEmailCreate({ name, email }: SendEmailHandler) {
    try {
      await this.sendEmailProvider.sendMail({
        from: 'bmozart.dev@gmail.com',
        to: email,
        subject: `Hello ✔ ${name}`,
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
      });
    } catch (error) {
      throw error;
    }
  }
}
