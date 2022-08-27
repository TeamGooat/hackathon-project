import { Transporter, createTransport } from "nodemailer"


export class MailProvider {
  private mailer: Transporter;

  constructor() {
    this.mailer = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })
    this.mailer
  }

  async sendMail(to: string, subject: string, body: string) {
    let info = await this.mailer.sendMail({
      from: `"ResponsIO 👻" <${process.env.EMAIL}>`, // sender address
      to,
      subject,
      html: body
    })

    return info.messageId
  }

}