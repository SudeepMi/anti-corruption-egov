const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    tls: {
      minVersion: "TLSv1", // -> This is the line that solved my problem
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  });
  // 2) Define the email options
  const mailOptions = {
    from: "Hami Nepal Org <admin@haminepal.org>",

    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  const info = await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
