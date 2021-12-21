const nodemailer = require('nodemailer')

const sendMail = async ({ from, to, subject, text, html }) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })
  console.log('sending mail')
  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  })
  console.log('info:', info)
}

module.exports = sendMail
