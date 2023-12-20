import { PriceType } from "./price-type.enum";

export interface Price {
  type: PriceType;
  price: number;
  start: Date;
  end: Date;
}

