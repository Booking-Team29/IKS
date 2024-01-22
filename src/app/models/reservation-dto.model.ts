import { ReservationStatus } from "./reservation-status.enum";

export interface ReservationDTO {
  startDate: Date;
  endDate: Date;
  guestCount: number;
  status: ReservationStatus;
  totalPrice: number;
  accommodationId: number;
}
