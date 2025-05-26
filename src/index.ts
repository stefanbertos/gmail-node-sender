import nodemailer from "nodemailer";

// Interfaces for input and response
export interface GmailAuth {
  user: string;
  pass: string;
}

export interface GmailMessage {
  from: string;
  to: string | string[];
  bcc?: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export interface GmailSendResponse {
  success: boolean;
  info?: unknown;
  error?: unknown;
}

// Global logger setup
export type GmailSenderLogger = {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

let logger: GmailSenderLogger = console;

/**
 * Set a custom logger for gmail-sender library.
 * @param customLogger An object with `log` and `error` methods.
 */
export function setGmailSenderLogger(customLogger: GmailSenderLogger) {
  logger = customLogger;
}

/**
 * Sends an email using Gmail and nodemailer.
 * @param auth Gmail authentication details.
 * @param message Email message details.
 * @returns GmailSendResponse
 */
export async function sendEmail(
  auth: GmailAuth,
  message: GmailMessage
): Promise<GmailSendResponse> {
  logger.log('[GmailSender] Sending email', { ...message });
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth
    });

    const info = await transporter.sendMail({
      from: message.from,
      to: message.to,
      bcc: message.bcc,
      subject: message.subject,
      html: message.html,
      replyTo: message.replyTo || message.from
    });

    logger.log('[GmailSender] response', info);
    return { success: true, info };
  } catch (error) {
    logger.error('[GmailSender] error', error);
    return { success: false, error };
  }
}
