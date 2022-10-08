const nodemailer = require('nodemailer')
const OAuth2 = require('googleapis').google.auth.OAuth2

const getAccessToken = async () => {
  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  )
  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN,
  })
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log('Error while getting access-token!\n', err)
        reject()
      }
      resolve(token)
    })
  })
  return accessToken
}

const createTransporter = async () => {
  const oauthAccessToken = await getAccessToken()
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.OAUTH_MAIL_USER,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: oauthAccessToken,
    },
  })
  console.log('transporter:', transporter)
  return transporter
}

const sendMail = async ({ from, to, subject, text, html }) => {
  const transporter = await createTransporter()
  console.log('sending mail...')
  const resultInfo = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  })
  return resultInfo
}

module.exports = sendMail
