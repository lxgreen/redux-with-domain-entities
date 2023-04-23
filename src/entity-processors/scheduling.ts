import {
  PreorderScheduling,
  SameDayScheduling,
  Scheduling,
  SchedulingType
} from "../types/scheduling";
import { EntityProcessors } from "./types";
import { prepTimeProcessors } from "./prep-time";

const sameDaySchedulingProcessors: EntityProcessors<Scheduling> = {
  areEqual: (a: SameDayScheduling, b: SameDayScheduling) =>
    a.type === SchedulingType.SAME_DAY &&
    b.type === SchedulingType.SAME_DAY &&
    prepTimeProcessors.areEqual(
      a.sameDaySettings.prepTime,
      b.sameDaySettings.prepTime
    ) &&
    a.sameDaySettings.allowLaterToday === b.sameDaySettings.allowLaterToday,
  isValid: (scheduling: SameDayScheduling) =>
    scheduling.type === SchedulingType.SAME_DAY &&
    prepTimeProcessors.isValid(scheduling.sameDaySettings.prepTime)
};

const preorderSchedulingProcessors: EntityProcessors<Scheduling> = {
  areEqual: (a: PreorderScheduling, b: PreorderScheduling) => false,
  isValid: (scheduling: PreorderScheduling) => false
};

const schedulingProcessorRegistry = {
  [SchedulingType.SAME_DAY]: sameDaySchedulingProcessors,
  [SchedulingType.PREORDER]: preorderSchedulingProcessors
};

export const schedulingProcessors: EntityProcessors<Scheduling> = {
  areEqual: (a: Scheduling, b: Scheduling): boolean => {
    const comparator = schedulingProcessorRegistry[a.type];
    if (!comparator)
      throw new Error(`No areEqual registered for type ${a.type}`);
    return comparator.areEqual(a, b);
  },
  isValid: (scheduling: Scheduling): boolean => {
    const validator = schedulingProcessorRegistry[scheduling.type];
    if (!validator)
      throw new Error(`No isValid registered for type ${scheduling.type}`);
    return validator.isValid(scheduling);
  }
};
