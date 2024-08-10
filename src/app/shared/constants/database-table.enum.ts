const DATABASE_TABLE = {
    PROFESSIONS : 'professions',
    SESSIONS : 'sessions'
} as const;

export type DatabaseTable = typeof DATABASE_TABLE[keyof typeof DATABASE_TABLE];