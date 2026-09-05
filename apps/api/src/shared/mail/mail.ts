import nodemailer from "nodemailer";

import { env } from "@/config/env.js";
import { constants } from "@/config/constants.js";
import { renderEmail, type TemplateData } from "./renderEmail.js";
import type { TemplateName } from "./templates/index.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

const subjects = {
  welcome: `Welcome to ${constants.appName}`,
  reWelcome: `Welcome Back to ${constants.appName}`,
  loginAlert: "New Login to Your Account",
  verifyEmail: "Verify Your Email",
  passwordReset: "Reset Your Password",
  accountDeleteAlert: "Account Deletion Alert",
  passwordChangedAlert: "Password Changed Alert",
} as const;

const sendEmail = async <T extends TemplateName>(config: {
  to: string;
  template: T;
  data: TemplateData[T];
}): Promise<void> => {
  try {
    const emailHtml = renderEmail(config.template, config.data);

    const res = await transporter.sendMail({
      from: `"${constants.appName}" <${env.SMTP_USER}>`,
      to: config.to,
      subject: subjects[config.template],
      html: emailHtml,
    });

    if (res.rejected.length) console.log("Error, email not sent to : \n", res.rejected);
  } catch (error) {
    console.log("Error sending email : \n", error);
  }
};

export { sendEmail };
