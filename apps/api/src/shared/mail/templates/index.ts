import Handlebars from "handlebars";

import { welcomeTemplate } from "./welcome.js";
import { reWelcomeTemplate } from "./reWelcome.js";
import { loginAlertTemplate } from "./loginAlert.js";
import { verifyEmailTemplate } from "./verifyEmail.js";
import { passwordResetTemplate } from "./passwordReset.js";
import { accountDeleteAlertTemplate } from "./accountDeleteAlert.js";
import { passwordChangedAlertTemplate } from "./passwordChangedAlert.js";
import { accountDeactivateAlertTemplate } from "./accountDeactivateAlert.js";

const templates = {
  welcome: Handlebars.compile(welcomeTemplate),
  reWelcome: Handlebars.compile(reWelcomeTemplate),
  loginAlert: Handlebars.compile(loginAlertTemplate),
  verifyEmail: Handlebars.compile(verifyEmailTemplate),
  passwordReset: Handlebars.compile(passwordResetTemplate),
  accountDeleteAlert: Handlebars.compile(accountDeleteAlertTemplate),
  passwordChangedAlert: Handlebars.compile(passwordChangedAlertTemplate),
  accountDeactivateAlert: Handlebars.compile(accountDeactivateAlertTemplate),
};

const templateNames = {
  welcome: "welcome",
  reWelcome: "reWelcome",
  loginAlert: "loginAlert",
  verifyEmail: "verifyEmail",
  passwordReset: "passwordReset",
  accountDeleteAlert: "accountDeleteAlert",
  passwordChangedAlert: "passwordChangedAlert",
  accountDeactivateAlert: "accountDeactivateAlert",
} as const;

type TemplateName = keyof typeof templates;

export { templates, templateNames, type TemplateName };
