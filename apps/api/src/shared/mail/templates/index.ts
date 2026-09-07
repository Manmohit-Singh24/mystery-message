import Handlebars from "handlebars";

import { welcomeTemplate } from "./welcome.js";
import { reWelcomeTemplate } from "./reWelcome.js";
import { loginAlertTemplate } from "./loginAlert.js";
import { verifyEmailTemplate } from "./verifyEmail.js";
import { passwordResetTemplate } from "./passwordReset.js";
import { emailChangeOtpTemplate } from "./emailChangeOtp.js";
import { emailChangeAuthTemplate } from "./emailChangeAuth.js";
import { emailChangedAlertTemplate } from "./emailChangedAlert.js";
import { accountDeleteAlertTemplate } from "./accountDeleteAlert.js";
import { passwordChangedAlertTemplate } from "./passwordChangedAlert.js";
import { accountDeactivateAlertTemplate } from "./accountDeactivateAlert.js";
import { emailChangedConfirmationTemplate } from "./emailChangedConfirmation.js";

const templates = {
  welcome: Handlebars.compile(welcomeTemplate),
  reWelcome: Handlebars.compile(reWelcomeTemplate),
  loginAlert: Handlebars.compile(loginAlertTemplate),
  verifyEmail: Handlebars.compile(verifyEmailTemplate),
  passwordReset: Handlebars.compile(passwordResetTemplate),
  emailChangeOtp: Handlebars.compile(emailChangeOtpTemplate),
  emailChangeAuth: Handlebars.compile(emailChangeAuthTemplate),
  emailChangedAlert: Handlebars.compile(emailChangedAlertTemplate),
  accountDeleteAlert: Handlebars.compile(accountDeleteAlertTemplate),
  passwordChangedAlert: Handlebars.compile(passwordChangedAlertTemplate),
  accountDeactivateAlert: Handlebars.compile(accountDeactivateAlertTemplate),
  emailChangedConfirmation: Handlebars.compile(emailChangedConfirmationTemplate),
};

const templateNames = {
  welcome: "welcome",
  reWelcome: "reWelcome",
  loginAlert: "loginAlert",
  verifyEmail: "verifyEmail",
  passwordReset: "passwordReset",
  emailChangeOtp: "emailChangeOtp",
  emailChangeAuth: "emailChangeAuth",
  emailChangedAlert: "emailChangedAlert",
  accountDeleteAlert: "accountDeleteAlert",
  passwordChangedAlert: "passwordChangedAlert",
  accountDeactivateAlert: "accountDeactivateAlert",
  emailChangedConfirmation: "emailChangedConfirmation",
} as const;

type TemplateName = keyof typeof templates;

export { templates, templateNames, type TemplateName };
