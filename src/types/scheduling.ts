export enum SchedulingType {
  SAME_DAY = 'SAME_DAY',
  PREORDER = 'PREORDER',
}

export enum PreorderSchedulingType {
  ROLLING = 'ROLLING',
  WEEKLY = 'WEEKLY',
  CUTOFF = 'CUTOFF',
}

export enum SchedulingUnit {
  MINUTES = 'MINUTES',
  HOURS = 'HOURS',
  DAYS = 'DAYS',
}

export enum SchedulingPrepTimeType {
  UP_TO = 'UP_TO',
  RANGE = 'RANGE',
}

export enum DayOfWeek {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export interface SchedulingTime {
  unit: SchedulingUnit;
  value: number;
}

export interface MinutesAndHoursSchedulingTime extends SchedulingTime {
  unit: Exclude<SchedulingUnit, SchedulingUnit.DAYS>;
}

export interface HoursAndDaysSchedulingTime extends SchedulingTime {
  unit: Exclude<SchedulingUnit, SchedulingUnit.MINUTES>;
}

export interface MinutesSchedulingTime extends SchedulingTime {
  unit: SchedulingUnit.MINUTES;
}

export interface PrepTimeRange {
  to: MinutesAndHoursSchedulingTime;
  from: MinutesAndHoursSchedulingTime;
}

export type RangePrepTime = {
  type: SchedulingPrepTimeType.RANGE;
  range: {
    from: MinutesAndHoursSchedulingTime;
    to: MinutesAndHoursSchedulingTime;
  };
};

export type UpperLimitPrepTime = {
  type: SchedulingPrepTimeType.UP_TO;
  upTo: MinutesAndHoursSchedulingTime;
};

export type PrepTime = RangePrepTime | UpperLimitPrepTime;

export interface SameDaySettings {
  prepTime: PrepTime;
  allowLaterToday: boolean;
}

export enum PreorderFulfillmentTimesType {
  SPECIFIC_TIMES = 'SPECIFIC_TIMES',
  TIME_WINDOWS = 'TIME_WINDOWS',
  FULL_DAY = 'FULL_DAY',
}

export type SpecificTimeFulfillment = {
  type: PreorderFulfillmentTimesType.SPECIFIC_TIMES;
  specificTime: MinutesSchedulingTime;
};

export type TimeWindowFulfillment = {
  type: PreorderFulfillmentTimesType.TIME_WINDOWS;
  timeWindow: MinutesAndHoursSchedulingTime;
};

export type PreorderFulfillmentTimesSettings =
  | SpecificTimeFulfillment
  | TimeWindowFulfillment
  | { type: PreorderFulfillmentTimesType.FULL_DAY };

export interface PreorderWeeklySettings {
  dayOfWeek: DayOfWeek;
}

export interface PreorderRollingSettings {
  minTimeInAdvance: HoursAndDaysSchedulingTime;
  maxTimeInAdvance: HoursAndDaysSchedulingTime;
}

export type RollingPreorder = {
  type: PreorderSchedulingType.ROLLING;
  rollingSettings: PreorderRollingSettings;
};

export type WeeklyPreorder = {
  type: PreorderSchedulingType.WEEKLY;
  weeklySettings: PreorderWeeklySettings;
};

export type PreorderSettings = (RollingPreorder | WeeklyPreorder) & {
  fulfillmentTimesSettings: PreorderFulfillmentTimesSettings;
};

export type PreorderScheduling = {
  type: SchedulingType.PREORDER;
  preorderSettings: PreorderSettings;
};

export type SameDayScheduling = {
  type: SchedulingType.SAME_DAY;
  sameDaySettings: SameDaySettings;
};

export type Scheduling = PreorderScheduling | SameDayScheduling;