import {
  Scheduling,
  SchedulingPrepTimeType,
  SchedulingType,
  SchedulingUnit
} from "../types/scheduling";
import { OrderScheduling } from "../models/scheduling";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialScheduling: Scheduling = {
  type: SchedulingType.SAME_DAY,
  sameDaySettings: {
    prepTime: {
      type: SchedulingPrepTimeType.UP_TO,
      upTo: {
        value: 30,
        unit: SchedulingUnit.MINUTES
      }
    },
    allowLaterToday: false
  }
};

const schedulings = createSlice({
  name: "schedulings",
  initialState: {
    left: initialScheduling,
    right: initialScheduling,
    areEqual: true
  },
  reducers: {
    compareSchedulings: (
      state,
      action: PayloadAction<{ left: Scheduling; right: Scheduling }>
    ) => {
      const leftEntity = OrderScheduling.from(action.payload.left);
      const rightEntity = OrderScheduling.from(action.payload.right);
      state.areEqual = leftEntity.isEqual(rightEntity);
      return state;
    }
  }
});

export default schedulings;
