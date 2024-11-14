const DATABASE_TABLE = {
    PROFESSIONS : 'professions',
    SESSIONS : 'sessions',
    FAST_TRACK_SESSIONS : 'fastTrackSessions',
    LOGS : 'logs'
} as const;

export type DatabaseTable = typeof DATABASE_TABLE[keyof typeof DATABASE_TABLE];