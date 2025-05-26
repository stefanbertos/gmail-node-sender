import { sendEmail, GmailAuth, GmailMessage } from '../../src';

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;
const testTo = process.env.GMAIL_TEST_TO;

describe('Integration: sendEmail', () => {
  it('should send a real email using real credentials', async () => {
    if (!gmailUser || !gmailPass || !testTo) {
      throw new Error('Missing GMAIL_USER, GMAIL_PASS, or GMAIL_TEST_TO environment variables');
    }
    const auth: GmailAuth = { user: gmailUser, pass: gmailPass };
    const message: GmailMessage = {
      from: gmailUser,
      to: testTo,
      subject: 'Integration test email',
      html: '<b>Integration test email</b>',
    };
    const response = await sendEmail(auth, message);
    console.log('Integration test response:', response);
    expect(response).toBeDefined();
    expect(typeof response.success).toBe('boolean');
  });
});
