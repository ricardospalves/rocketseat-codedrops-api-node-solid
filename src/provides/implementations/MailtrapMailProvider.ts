import Mail from 'nodemailer/lib/mailer'
import { IMailProvider, IMessage } from '../IMailProvider'
import nodemailer from 'nodemailer'

const MAILTRAP_USERNAME = process.env.MAILTRAP_USERNAME
const MAILTRAP_PASSWORD = process.env.MAILTRAP_PASSWORD

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: MAILTRAP_USERNAME,
        pass: MAILTRAP_PASSWORD,
      },
    })
  }

  async sendEmail({ body, from, subject, to }: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        address: to.email,
        name: to.name,
      },
      from: {
        address: from.email,
        name: from.name,
      },
      subject,
      html: body,
    })
  }
}
