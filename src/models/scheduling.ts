import {
  PreorderSettings,
  SameDaySettings,
  Scheduling,
  SchedulingType
} from "../types/scheduling";
import { FulfillmentTime } from "./fulfillment-time";
import { PreorderStrategy } from "./preorder-strategy";
import { PreparationTime } from "./prep-time";

export abstract class OrderScheduling {
  public static from(scheduling: Scheduling) {
    switch (scheduling.type) {
      case SchedulingType.SAME_DAY:
        return new SameDayScheduling(scheduling.sameDaySettings);
      case SchedulingType.PREORDER:
        return new PreorderScheduling(scheduling.preorderSettings);
    }
  }

  public abstract isEqual(other: OrderScheduling): boolean;
}

export class SameDayScheduling extends OrderScheduling {
  protected readonly prepTime: PreparationTime;

  constructor(private readonly settings: SameDaySettings) {
    super();
    this.prepTime = PreparationTime.from(this.settings.prepTime);
  }

  public isEqual(other: OrderScheduling): boolean {
    return (
      other instanceof SameDayScheduling &&
      this.settings.allowLaterToday === other.settings.allowLaterToday &&
      this.prepTime.isEqual(other.prepTime)
    );
  }
}

export class PreorderScheduling extends OrderScheduling {
  protected readonly fulfillmentTime: FulfillmentTime;
  protected readonly preorderStrategy: PreorderStrategy;

  constructor(settings: PreorderSettings) {
    super();
    this.fulfillmentTime = FulfillmentTime.from(
      settings.fulfillmentTimesSettings
    );
    this.preorderStrategy = PreorderStrategy.from(settings);
  }

  public isEqual(other: OrderScheduling): boolean {
    return (
      other instanceof PreorderScheduling &&
      this.preorderStrategy.isEqual(other.preorderStrategy) &&
      this.fulfillmentTime.isEqual(other.fulfillmentTime)
    );
  }
}
