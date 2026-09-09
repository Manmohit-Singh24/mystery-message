import z from "zod";
import { emailTemplates, type EmailTemplateName } from "./templates.js";

const emailTemplateDataSchemas: Record<EmailTemplateName, z._ZodType> = {
  welcome: z.object({
    name: z.string(),
    dashboardLink: z.url(),
  }),

  welcomeBack: z.object({
    name: z.string(),
    time: z.coerce.date(),
    deviceInfo: z.string(),
  }),

  loginAlert: z.object({
    name: z.string(),
    time: z.coerce.date(),
    deviceInfo: z.string(),
  }),

  emailVerification: z.object({
    name: z.string(),
    verificationUrl: z.url(),
    date: z.coerce.date(),
  }),

  passwordReset: z.object({
    name: z.string(),
    resetUrl: z.url(),
  }),

  passwordChangedAlert: z.object({
    name: z.string(),
    time: z.coerce.date(),
  }),

  emailChangeRequest: z.object({
    name: z.string(),
    changeEmailUrl: z.url(),
  }),

  emailChangeVerification: z.object({
    otp: z.string(),
  }),

  emailChangedAlert: z.object({
    name: z.string(),
    oldEmail: z.email(),
    newEmail: z.email(),
    time: z.coerce.date(),
  }),

  emailChangedConfirmation: z.object({
    name: z.string(),
    newEmail: z.email(),
    time: z.coerce.date(),
  }),

  accountDeletionAlert: z.object({
    name: z.string(),
    date: z.coerce.date(),
  }),

  accountDeactivationAlert: z.object({
    name: z.string(),
  }),
};

type EmailTemplateData = {
  [K in EmailTemplateName]: z.infer<(typeof emailTemplateDataSchemas)[K]>;
};

type EmailJobData<T extends EmailTemplateName> = {
  to: string;
  template: T;
  data: EmailTemplateData[T];
};

type EmailJobParseResult =
  | {
      success: true;
      data: EmailJobData<EmailTemplateName>;
    }
  | {
      success: false;
      error: z.ZodError;
    };

function parseEmailJobData(input: unknown): EmailJobParseResult {
  const baseResult = z
    .object({
      to: z.email(),
      template: z.enum(Object.keys(emailTemplates) as [EmailTemplateName, ...EmailTemplateName[]]),
      data: z.unknown(),
    })
    .safeParse(input);

  if (!baseResult.success)
    return {
      success: false,
      error: baseResult.error,
    };

  const { to, template, data } = baseResult.data;

  const dataResult = emailTemplateDataSchemas[template].safeParse(data);

  if (!dataResult.success)
    return {
      success: false,
      error: dataResult.error,
    };

  return {
    success: true,
    data: {
      to: to,
      template: template,
      data: dataResult.data,
    },
  };
}

export { parseEmailJobData };
export type { EmailJobData, EmailTemplateData };
