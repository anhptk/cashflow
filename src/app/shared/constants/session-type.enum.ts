const SESSION_TYPE = {
    RAT_RACE: 'ratRace',
    FAST_TRACK: 'fastTrack'
} as const;

export type SessionType = typeof SESSION_TYPE[keyof typeof SESSION_TYPE];