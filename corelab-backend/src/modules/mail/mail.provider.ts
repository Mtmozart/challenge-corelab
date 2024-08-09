import * as nodemailer from 'nodemailer';
import { EnvConfig } from 'src/config/app.config';

const transporter = nodemailer.createTransport({
  host: EnvConfig.EMAIL.HOST_EMAIL,
  port: EnvConfig.EMAIL.PORT_EMAIL,
  secure: false,
  auth: {
    user: EnvConfig.EMAIL.USER_AUTH_EMAIL,
    pass: EnvConfig.EMAIL.EMAIL_PASS_EMAIL,
  },
});

export const SendEmailProvider = {
  provide: 'SEND_EMAIL_PROVIDER',
  useValue: transporter,
};
