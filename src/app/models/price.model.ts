import { PriceType } from "./price-type.enum";

export interface Price {
  type: PriceType;
  amount: number;
  start: Date;
  end: Date;
}

