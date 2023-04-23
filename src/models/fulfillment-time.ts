import {
  PreorderFulfillmentTimesSettings,
  PreorderFulfillmentTimesType,
  SpecificTimeFulfillment,
  TimeWindowFulfillment
} from "../types/scheduling";
import { MinutesAndHoursInterval, MinutesInterval } from "./time-interval";

export abstract class FulfillmentTime {
  public static from(
    fulfillmentTimeSettings: PreorderFulfillmentTimesSettings
  ) {
    switch (fulfillmentTimeSettings.type) {
      case PreorderFulfillmentTimesType.SPECIFIC_TIMES:
        return new SpecificFulfillmentTime(fulfillmentTimeSettings);
      case PreorderFulfillmentTimesType.TIME_WINDOWS:
        return new TimeWindowFulfillmentTime(fulfillmentTimeSettings);
      case PreorderFulfillmentTimesType.FULL_DAY:
        return new FullDayFulfillmentTime();
    }
  }

  public abstract isEqual(other: FulfillmentTime): boolean;
}

class SpecificFulfillmentTime extends FulfillmentTime {
  specificTime: MinutesInterval;
  constructor(fulfillmentTime: SpecificTimeFulfillment) {
    super();
    this.specificTime = new MinutesInterval(fulfillmentTime.specificTime);
  }
  public isEqual(other: FulfillmentTime): boolean {
    return (
      other instanceof SpecificFulfillmentTime &&
      this.specificTime.isEqual(other.specificTime)
    );
  }
}

class TimeWindowFulfillmentTime extends FulfillmentTime {
  timeWindow: MinutesAndHoursInterval;
  constructor(fulfillmentTime: TimeWindowFulfillment) {
    super();
    this.timeWindow = new MinutesAndHoursInterval(fulfillmentTime.timeWindow);
  }
  public isEqual(other: FulfillmentTime): boolean {
    return (
      other instanceof TimeWindowFulfillmentTime &&
      this.timeWindow.isEqual(other.timeWindow)
    );
  }
}

class FullDayFulfillmentTime extends FulfillmentTime {
  public isEqual(other: FulfillmentTime): boolean {
    return other instanceof FullDayFulfillmentTime;
  }
}
