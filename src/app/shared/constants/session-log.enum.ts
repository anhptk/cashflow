export const SESSION_LOG_TYPE = {
    Payday: 'Payday',
    Downsize: 'Downsize',
    
} as const;

export type SessionLogType = typeof SESSION_LOG_TYPE[keyof typeof SESSION_LOG_TYPE];