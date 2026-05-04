export const validateAuth = {
  login: (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isValidEmail = cleanEmail.includes('@') && cleanEmail.includes('.');
    return { isValid: isValidEmail && pass.length >= 6, email: cleanEmail };
  },
  register: (name: string, email: string, pass: string, confirmPass: string) => {
    return {
      isNameOk: name.length >= 3,
      isEmailOk: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      isMatch: pass === confirmPass,
      isStrong: pass.length >= 8
    };
  }
};