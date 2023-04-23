import { PrepTimeRange, SchedulingTime } from "../types/scheduling";
import { EntityProcessors } from "./types";

export const schedulingTimeProcessors: EntityProcessors<SchedulingTime> = {
  areEqual: (a: SchedulingTime, b: SchedulingTime): boolean => {
    return a.unit === b.unit && a.value === b.value;
  },
  isValid: (prepTime: SchedulingTime) => {
    // Implement isValid for SchedulingTime
    return false;
  }
};

export const schedulingTimeRangeProcessors: EntityProcessors<PrepTimeRange> = {
  areEqual: (a: PrepTimeRange, b: PrepTimeRange): boolean => {
    return (
      schedulingTimeProcessors.areEqual(a.to, b.to) &&
      schedulingTimeProcessors.areEqual(a.from, b.from)
    );
  },
  isValid: (prepTime: PrepTimeRange) => {
    // Implement isValid for SchedulingTime
    return false;
  }
};
