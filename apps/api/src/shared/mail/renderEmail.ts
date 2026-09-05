import Handlebars from "handlebars";

import { constants } from "@/config/constants.js";
import { styles } from "./styles.js";
import { templates, type TemplateName } from "./templates/index.js";

const renderEmail = <T extends TemplateName>(template: T, data: TemplateData[T]) => {
  return templates[template]({ styles, appName: constants.appName, ...data });
};

Handlebars.registerHelper("formatDate", (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
});

type TemplateData = {
  welcome: {
    name: string;
    dashboardLink: string;
  };

  reWelcome: {
    name: string;
    time: Date;
    deviceInfo: string;
  };

  loginAlert: {
    name: string;
    time: Date;
    deviceInfo: string;
  };

  verifyEmail: {
    name: string;
    verificationUrl: string;
    date: Date;
  };

  passwordReset: {
    name: string;
    resetUrl: string;
  };

  accountDeleteAlert: {
    name: string;
    date: Date;
  };

  passwordChangedAlert: {
    name: string;
    time: Date;
  };
};

export { renderEmail, type TemplateData };
