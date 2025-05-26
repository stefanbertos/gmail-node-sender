# gmail-sender

To use the library, install it with:

```sh
npm install gmail-sender
```

**Requires Node.js 22.x**

## Default Values

There are no internal default values for sending email. All fields must be provided via the input interfaces. Optional fields:

- `bcc` (optional): string or string[]
- `replyTo` (optional): string

## Interfaces

```typescript
export interface GmailAuth {
  user: string; // Gmail address
  pass: string; // Gmail App Password
}

export interface GmailMessage {
  from: string; // Sender Gmail address
  to: string | string[]; // Recipient(s)
  bcc?: string | string[]; // Optional BCC
  subject: string; // Email subject
  html: string; // Email body (HTML)
  replyTo?: string; // Optional reply-to address
}

export interface GmailSendResponse {
  success: boolean;
  info?: unknown; // Nodemailer info object
  error?: unknown; // Error if failed
}
```

## Example Usage

```typescript
import { sendEmail, GmailAuth, GmailMessage } from 'gmail-sender';

const auth: GmailAuth = {
  user: 'your.email@gmail.com',
  pass: 'your-app-password',
};

const message: GmailMessage = {
  from: 'your.email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Hello from gmail-sender',
  html: '<b>This is a test email</b>',
};

sendEmail(auth, message).then((response) => {
  if (response.success) {
    console.log('Email sent:', response.info);
  } else {
    console.error('Failed to send email:', response.error);
  }
});
```

## Custom Logging

You can provide a custom logger to capture logs and errors:

```typescript
import { setGmailSenderLogger } from 'gmail-sender';

setGmailSenderLogger({
  log: (...args) => {
    /* custom log logic */
  },
  error: (...args) => {
    /* custom error logic */
  },
});
```

## Badges

[![Build Status](https://github.com/stefanbertos/bulkgate-sms/actions/workflows/ci.yml/badge.svg)](https://github.com/stefanbertos/bulkgate-sms/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bulkgate-sms.svg?style=flat-square)](https://www.npmjs.com/package/bulkgate-sms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
