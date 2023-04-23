import {
  PrepTime,
  RangePrepTime,
  SchedulingPrepTimeType,
  UpperLimitPrepTime
} from "../types/scheduling";
import { EntityProcessors } from "./types";
import {
  schedulingTimeProcessors,
  schedulingTimeRangeProcessors
} from "./scheduling-time";

// Utility functions for UpperLimitPrepTime
const upperLimitPrepTimeProcessors: EntityProcessors<PrepTime> = {
  areEqual: (a: UpperLimitPrepTime, b: UpperLimitPrepTime): boolean => {
    return schedulingTimeProcessors.areEqual(a.upTo, b.upTo);
  },
  isValid: (prepTime: UpperLimitPrepTime) => {
    // Implement isValid for UpperLimitPrepTime
    return false;
  }
};

// Utility functions for RangePrepTime
const rangePrepTimeEntityProcessors: EntityProcessors<PrepTime> = {
  areEqual: (a: RangePrepTime, b: RangePrepTime) =>
    schedulingTimeRangeProcessors.areEqual(a.range, b.range),
  isValid: (prepTime: RangePrepTime) => {
    // Implement isValid for RangePrepTime
    return false;
  }
};

const prepTimeProcessorRegistry = {
  [SchedulingPrepTimeType.UP_TO]: upperLimitPrepTimeProcessors,
  [SchedulingPrepTimeType.RANGE]: rangePrepTimeEntityProcessors
};

export const prepTimeProcessors: EntityProcessors<PrepTime> = {
  areEqual: (a: PrepTime, b: PrepTime): boolean => {
    const processor = prepTimeProcessorRegistry[a.type];
    if (!processor) throw new Error(`No isEqual registered for type ${a.type}`);
    return processor.areEqual(a, b);
  },
  isValid: (prepTime: PrepTime): boolean => {
    const utils = prepTimeProcessorRegistry[prepTime.type];
    if (!utils)
      throw new Error(`No isValid registered for type ${prepTime.type}`);
    return utils.isValid(prepTime);
  }
};
