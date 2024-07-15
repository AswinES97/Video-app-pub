import nodemailer from 'nodemailer'
import configKeys from '../../config/config'

export class Mailer {
  // Todo set config in somewhere else
  async sentMail (senderMail: string, token: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'aswin.ticketing@gmail.com',
        pass: configKeys.NODE_MAILER_PASS
      }
    })

    await transporter.sendMail({
      from: '"Ticketing" aswin.ticketing@gmail.com', // sender address
      to: senderMail, // list of receivers
      subject: 'Ticketing Verification', // Subject line
      text: `Please verify your email by clicking: ${configKeys.MAIL_URL}/${token}` // plain text body
    })
  }
}
