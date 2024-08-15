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
        subject: `Bem-vindo, ${name}!`,
        text: `Olá, ${name}! Seja bem-vindo!`,
        html: `
          <h1>Bem-vindo(a) ${name}!</h1>
          <p>Obrigado por se cadastrar em nossa plataforma. Estamos felizes em tê-lo(a) conosco.</p>
          <p>Se tiver qualquer dúvida, não hesite em nos contatar.</p>
          <p>Atenciosamente,<br/>Equipe Bmozart</p>
        `,
      });
    } catch (error) {
      throw error;
    }
  }

  async resetPasswordEmail(email: string, username: string, password: string) {
    try {
      await this.sendEmailProvider.sendMail({
        from: 'bmozart.dev@gmail.com',
        to: email,
        subject: `Redefinição de Senha para ${username}`,
        text: `Olá ${username},\n\nSua senha foi redefinida com sucesso. Sua nova senha é: ${password}\n\nAtenciosamente,\nEquipe Bmozart`,
        html: `
          <h1>Redefinição de Senha</h1>
          <p>Olá ${username},</p>
          <p>Sua senha foi redefinida com sucesso. Sua nova senha é:</p>
          <p><strong>${password}</strong></p>
          <p>Se você não solicitou essa alteração, por favor, entre em contato com nosso suporte imediatamente.</p>
          <p>Atenciosamente,<br/>Equipe Bmozart</p>
        `,
      });
    } catch (error) {
      throw error;
    }
  }
}
