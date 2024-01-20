import { AccommodationStatus } from "./accommodation-status.enum";
import { PricingType } from "./pricing-type.enum";
import { Price } from "./price.model";
import {DateRange} from "./date-range.model";
import {ConfirmationMethod} from "./confirmation-method.enum";

export interface Accommodation {
  id: number;
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
  type: AccommodationStatus;
  availableDates: DateRange[];
  confirmationMethod: ConfirmationMethod;
}
