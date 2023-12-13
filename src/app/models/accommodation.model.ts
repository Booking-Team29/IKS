import { AccommodationStatus } from "./accommodation-status.enum";
import { PricingType } from "./price-type.enum";
import { Price } from "./price.model";

export interface Accommodation {
  ID: number;
  Name: string;
  Description: string;
  Location: string;
  LocationCoordinates: number[];
  MinGuests: number;
  MaxGuests: number;
  prices: Price[];
  PricingType: PricingType;
  DaysForCancellation: number;
  Amenities: string[];
  AccommodationStatus: AccommodationStatus;
  Images: string[];
  Type: AccommodationStatus;
  AvaiableDates: Date[];
}
