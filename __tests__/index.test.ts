import { sendEmail, GmailAuth, GmailMessage, GmailSendResponse } from '../src';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

const mockSendMail = jest.fn();
(nodemailer.createTransport as jest.Mock).mockReturnValue({
  sendMail: mockSendMail,
});

describe('sendEmail', () => {
  beforeEach(() => {
    mockSendMail.mockReset();
  });

  it('should send email with correct params', async () => {
    mockSendMail.mockImplementation((opts, cb) => cb(null, { response: 'ok', accepted: ['to@email.com'] }));
    const auth: GmailAuth = { user: 'test@gmail.com', pass: 'password' };
    const message: GmailMessage = {
      from: 'test@gmail.com',
      to: 'to@email.com',
      subject: 'Test',
      html: '<b>Hello</b>',
    };
    const result = await sendEmail(auth, message);
    expect(result.success).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: message.from,
        to: message.to,
        subject: message.subject,
        html: message.html,
      }),
      expect.any(Function)
    );
  });

  it('should handle errors from nodemailer', async () => {
    mockSendMail.mockImplementation((opts, cb) => cb(new Error('fail'), null));
    const auth: GmailAuth = { user: 'test@gmail.com', pass: 'password' };
    const message: GmailMessage = {
      from: 'test@gmail.com',
      to: 'to@email.com',
      subject: 'Test',
      html: '<b>Hello</b>',
    };
    const result = await sendEmail(auth, message);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
