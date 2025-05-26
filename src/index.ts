import nodemailer from 'nodemailer';

// Interfaces for input and response
export interface GmailNodeSenderAuth {
  user: string;
  pass: string;
}

export interface GmailNodeSenderMessage {
  from: string;
  to: string | string[];
  bcc?: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export interface GmailNodeSenderSendResponse {
  success: boolean;
  info?: unknown;
  error?: unknown;
}

// Global logger setup
export type GmailNodeSenderLogger = {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

let logger: GmailNodeSenderLogger = console;

/**
 * Set a custom logger for gmail-node-sender library.
 * @param customLogger An object with `log` and `error` methods.
 */
export function setGmailNodeSenderLogger(customLogger: GmailNodeSenderLogger) {
  logger = customLogger;
}

/**
 * Sends an email using Gmail and nodemailer.
 * @param auth Gmail authentication details.
 * @param message Email message details.
 * @returns GmailNodeSenderSendResponse
 */
export async function sendEmail(
  auth: GmailNodeSenderAuth,
  message: GmailNodeSenderMessage,
): Promise<GmailNodeSenderSendResponse> {
  logger.log('[GmailNodeSender] Sending email', { ...message });
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth,
    });

    const info = await transporter.sendMail({
      from: message.from,
      to: message.to,
      bcc: message.bcc,
      subject: message.subject,
      html: message.html,
      replyTo: message.replyTo || message.from,
    });

    logger.log('[GmailNodeSender] response', info);
    return { success: true, info };
  } catch (error) {
    logger.error('[GmailNodeSender] error', error);
    return { success: false, error };
  }
}
