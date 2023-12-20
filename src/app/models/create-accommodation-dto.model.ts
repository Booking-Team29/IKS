import { AccommodationStatus } from "./accommodation-status.enum";
import { AccommodationType } from "./accommodation-type.enum";
import { PricingType } from "./pricing-type.enum";
import { Price } from "./price.model";

export interface CreateAccommodationDTO {
  name: string;
  description: string;
  location: string;
  locationCoordinates: number[];
  minGuests: number;
  maxGuests: number;
  prices: Price[];
  pricingType: PricingType;
  daysForCancellation: number;
  amenities: string[];
  accommodationStatus: AccommodationStatus;
  images: string[];
  type: AccommodationType;
  avaliableDates: Date[];
}
