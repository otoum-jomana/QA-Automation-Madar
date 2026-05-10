import { validateAuth } from '../src/authValidator';

describe('QA Manual Cases Automation - Madar Project', () => {

  beforeEach(() => {
    // التعديل هون: بنعرف الـ fetch كـ function وهمية مباشرة
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: 'Jomana', token: '123' }),
      } as Response)
    );
  });

  afterEach(() => {
    jest.restoreAllMocks(); 
    jest.clearAllMocks(); // زيادة تأكيد لتنظيف الذاكرة
  });

  // اختباراتك
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