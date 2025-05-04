// utils/mail.ts
import dotenv from "dotenv";
import nodemailer, { Transporter } from "nodemailer";

dotenv.config();

type SendMailResult = {
  success: boolean;
  message: string;
  info?: any;
  error?: any;
};

const createTransporter = (): Transporter => {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
  });
};

export const sendMail = async (
  email: string,
  subject: string,
  message: string
): Promise<SendMailResult> => {
  try {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: subject,
      html: message,
    });

    if (info.accepted && info.accepted.length > 0) {
      return {
        success: true,
        message: `Email sent successfully with login credentials to: ${email}`,
      };
    } else {
      return { success: false, message: "Failed to send email", info };
    }
  } catch (error) {
    return { success: false, message: "Failed to send email", error };
  }
};
