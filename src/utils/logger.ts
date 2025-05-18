// backend-boilerplate/src/utils/logger.ts
export const log = {
  info: (...args: any[]) => console.log('ℹ️', ...args),
  warn: (...args: any[]) => console.warn('⚠️', ...args),
  error: (...args: any[]) => console.error('❌', ...args),
  success: (...args: any[]) => console.log('✅', ...args),
};
