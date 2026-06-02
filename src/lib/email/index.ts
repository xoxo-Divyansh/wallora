import { Resend } from "resend";

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailConfig {
  from: string;
  appUrl: string;
}

export function getEmailConfig(): EmailConfig | null {
  const from = process.env.QUOTE_EMAIL_FROM;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!from || !appUrl) return null;

  return {
    from,
    appUrl: appUrl.replace(/\/$/, ""),
  };
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && getEmailConfig());
}

export async function sendEmail(input: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const config = getEmailConfig();

  if (!apiKey || !config) {
    throw new Error("Email delivery is not configured.");
  }

  const resend = new Resend(apiKey);
  return resend.emails.send({
    from: config.from,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}
