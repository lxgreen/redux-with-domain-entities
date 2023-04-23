import {
  HoursAndDaysSchedulingTime,
  MinutesAndHoursSchedulingTime,
  MinutesSchedulingTime,
  SchedulingTime
} from "../types/scheduling";

class TimeInterval<T extends SchedulingTime> {
  constructor(public readonly interval: T) {}

  isEqual(other: TimeInterval<T>) {
    return (
      this.interval.value === other.interval.value &&
      this.interval.unit === other.interval.unit
    );
  }
}

class TimeRange<T extends SchedulingTime> {
  from: TimeInterval<T>;
  to: TimeInterval<T>;
  constructor(from: T, to: T) {
    this.from = new TimeInterval(from);
    this.to = new TimeInterval(to);
  }

  isEqual(other: TimeRange<T>) {
    return this.from.isEqual(other.from) && this.to.isEqual(other.to);
  }
}

export class HoursAndDaysInterval extends TimeInterval<
  HoursAndDaysSchedulingTime
> {}
export class MinutesAndHoursInterval extends TimeInterval<
  MinutesAndHoursSchedulingTime
> {}
export class MinutesInterval extends TimeInterval<MinutesSchedulingTime> {}
export class HoursAndDaysRange extends TimeRange<HoursAndDaysSchedulingTime> {}
export class MinutesAndHoursRange extends TimeRange<
  MinutesAndHoursSchedulingTime
> {}
