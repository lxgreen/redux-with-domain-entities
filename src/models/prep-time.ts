import {
  PrepTime,
  RangePrepTime,
  SchedulingPrepTimeType,
  UpperLimitPrepTime
} from "../types/scheduling";
import { MinutesAndHoursInterval, MinutesAndHoursRange } from "./time-interval";

export abstract class PreparationTime {
  public static from(prepTime: PrepTime) {
    switch (prepTime.type) {
      case SchedulingPrepTimeType.UP_TO:
        return new UpperLimitPreparationTime(prepTime);
      case SchedulingPrepTimeType.RANGE:
        return new RangePreparationTime(prepTime);
    }
  }

  public abstract isEqual(other: PreparationTime): boolean;
}

class RangePreparationTime extends PreparationTime {
  protected readonly range: MinutesAndHoursRange;

  constructor(prepTime: RangePrepTime) {
    super();
    this.range = new MinutesAndHoursRange(
      prepTime.range.from,
      prepTime.range.to
    );
  }

  public isEqual(other: PreparationTime): boolean {
    return (
      other instanceof RangePreparationTime && this.range.isEqual(other.range)
    );
  }
}

class UpperLimitPreparationTime extends PreparationTime {
  protected readonly upToPrepTime: MinutesAndHoursInterval;

  constructor(prepTime: UpperLimitPrepTime) {
    super();
    this.upToPrepTime = new MinutesAndHoursInterval(prepTime.upTo);
  }

  public isEqual(other: PreparationTime): boolean {
    return (
      other instanceof UpperLimitPreparationTime &&
      this.upToPrepTime.isEqual(other.upToPrepTime)
    );
  }
}
