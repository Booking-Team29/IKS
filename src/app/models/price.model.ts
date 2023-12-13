import { PriceType } from "./pricing-type.enum";

export interface Price {
  Type: PriceType;
  price: number;
  start: Date;
  end: Date;
}

