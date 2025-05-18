// backend-boilerplate/src/api/auth/twoFactor.service.ts
import speakeasy from 'speakeasy';

export const generateTwoFactorSecret = (email: string) => {
  return speakeasy.generateSecret({ name: `AppName (${email})` });
};

export const verifyTwoFactorToken = (secret: string, token: string): boolean => {
  return speakeasy.totp.verify({
    secret,
    encoding: 'ascii',
    token,
  });
};
