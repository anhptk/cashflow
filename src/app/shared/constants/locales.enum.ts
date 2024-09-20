export const LOCALES = {
  EN_US: 'en-US',
  VI_VN: 'vi-VN'
} as const;

export type AppLocale = typeof LOCALES[keyof typeof LOCALES];