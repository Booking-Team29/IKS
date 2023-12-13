import { AccommodationStatus } from "./accommodation-status.enum";
import { AccommodationType } from "./accommodation-type.enum";
import { PricingType } from "./price-type.enum";
import { Price } from "./price.model";

export interface AccommodationDTO {
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
  Type: AccommodationType;
  AvaliableDates: Date[];
}
