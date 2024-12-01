export const HOUSE_TYPE = {
  TWO_BED_ONE_BATH: 'TWO_BED_ONE_BATH',
  THREE_BED_TWO_BATH: 'THREE_BED_TWO_BATH',
  DUPLEX: 'DUPLEX',
  FOURPLEX: 'FOURPLEX',
  EIGHT_UNIT: 'EIGHT_UNIT',
  TWELVE_UNIT: 'TWELVE_UNIT',
  TWENTY_FOUR_UNIT: 'TWENTY_FOUR_UNIT',
  SIXTY_UNIT: 'SIXTY_UNIT'
} as const;

export type HouseType = typeof HOUSE_TYPE[keyof typeof HOUSE_TYPE];

export const HOUSE_TYPE_LABEL = {
  TWO_BED_ONE_BATH: $localize`:@@twoBedOneBath:2Bd/1Ba`,
  THREE_BED_TWO_BATH: $localize`:@@threeBedTwoBath:3Bd/2Ba`,
  DUPLEX: $localize`:@@duplex:Duplex`,
  FOURPLEX: $localize`:@@fourplex:4-Plex`,
  EIGHT_UNIT: $localize`:@@eightUnit:8-Unit`,
  TWELVE_UNIT: $localize`:@@twelveUnit:12-Unit`,
  TWENTY_FOUR_UNIT: $localize`:@@twentyFourUnit:24-Unit`,
  SIXTY_UNIT: $localize`:@@sixtyUnit:60-Unit`
}