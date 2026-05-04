import { validateAuth } from '../src/authValidator';

describe('QA Manual Cases Automation', () => {
  test('Login: Should handle email formatting', () => {
    const res = validateAuth.login(' JOMANA@MAIL.COM ', '123456');
    expect(res.email).toBe('jomana@mail.com');
    expect(res.isValid).toBe(true);
  });

  test('Register: Should detect password mismatch', () => {
    const res = validateAuth.register('Jomana', 'jo@mail.com', 'pass123', 'pass456');
    expect(res.isMatch).toBe(false);
  });
});