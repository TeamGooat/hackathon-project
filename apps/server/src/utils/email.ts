import nodemailer from "nodemailer"

export const getTransporter = () => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      })

    return transporter
}

export const sendEmail = (subject: string, text: string, toEmail: string) => {

    let transporter = getTransporter()

    const email = {
        from: process.env.EMAIL,
        to: toEmail,
        subject: subject,
        text
    }
  
    transporter.sendMail(email).catch(error => {
        return false
      })

    return true
}