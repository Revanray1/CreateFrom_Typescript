
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with your SMTP server's host
  port: 587, // Replace with your SMTP server's port (587 for TLS, 465 for SSL)
  secure: false, // Use true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default transporter;
