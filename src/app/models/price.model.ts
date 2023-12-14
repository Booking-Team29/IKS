import { PriceType } from "./pricing-type.enum";
import {PricingType} from "./price-type.enum";

export interface Price {
  Type: PricingType;
  price: number;
  start: Date;
  end: Date;
}

