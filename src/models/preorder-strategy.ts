import {
  PreorderRollingSettings,
  PreorderSchedulingType,
  PreorderSettings,
  PreorderWeeklySettings,
  RollingPreorder,
  WeeklyPreorder
} from "../types/scheduling";

import { HoursAndDaysInterval } from "./time-interval";

export abstract class PreorderStrategy {
  public static from(preorderSettings: PreorderSettings) {
    switch (preorderSettings.type) {
      case PreorderSchedulingType.WEEKLY:
        return new WeeklyPreorderStrategy(preorderSettings);
      case PreorderSchedulingType.ROLLING:
        return new RollingPreorderStrategy(preorderSettings);
    }
  }

  public abstract isEqual(other: PreorderStrategy): boolean;
}

class RollingPreorderStrategy extends PreorderStrategy {
  protected rollingSettings: PreorderRollingSettings;
  minTimeInAdvance: HoursAndDaysInterval;
  maxTimeInAdvance: HoursAndDaysInterval;

  constructor(preorderSettings: RollingPreorder) {
    super();
    this.rollingSettings = preorderSettings.rollingSettings;
    this.minTimeInAdvance = new HoursAndDaysInterval(
      preorderSettings.rollingSettings.minTimeInAdvance
    );
    this.maxTimeInAdvance = new HoursAndDaysInterval(
      preorderSettings.rollingSettings.maxTimeInAdvance
    );
  }

  public isEqual(other: PreorderStrategy): boolean {
    return (
      other instanceof RollingPreorderStrategy &&
      this.minTimeInAdvance.isEqual(other.minTimeInAdvance) &&
      this.maxTimeInAdvance.isEqual(other.maxTimeInAdvance)
    );
  }
}

class WeeklyPreorderStrategy extends PreorderStrategy {
  protected weeklySettings: PreorderWeeklySettings;
  constructor(preorderSettings: WeeklyPreorder) {
    super();
    this.weeklySettings = preorderSettings.weeklySettings;
  }

  public isEqual(other: PreorderStrategy): boolean {
    return (
      other instanceof WeeklyPreorderStrategy &&
      this.weeklySettings.dayOfWeek === other.weeklySettings.dayOfWeek
    );
  }
}
