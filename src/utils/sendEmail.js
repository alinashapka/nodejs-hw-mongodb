import nodemailer from 'nodemailer';

import { getEnvVar } from './getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),
  port: Number(getEnvVar('SMTP_PORT')),
  secure: false,
  auth: {
    user: getEnvVar('SMTP_LOGIN'),
    pass: getEnvVar('SMTP_PASSWORD'),
  },
});

export function sendEmail(mail) {
  mail.from = getEnvVar('SMTP_FROM');

  return transporter.sendMail(mail);
}
