import { Scheduling } from "../types/scheduling";
import { schedulingProcessors } from "./scheduling";

export const areSchedulingsEqual = (a: Scheduling, b: Scheduling) =>
  schedulingProcessors.areEqual(a, b);
