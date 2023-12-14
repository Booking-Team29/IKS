import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDTO } from '../models/reservation-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _baseUrl: string = 'http://localhost:8080/api/v1';
  private _reservationUrl: string;

  constructor(private http: HttpClient) {
    this._reservationUrl = this._baseUrl + '/reservation';
  }

  get reservationUrl(): string {
    return this._reservationUrl;
  }

  create(reservation: ReservationDTO): Observable<ReservationDTO> {
    return this.http.post<ReservationDTO>(this.reservationUrl, reservation);
  }

  getReservationRequests(ownerId: string): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(`${this.reservationUrl}/reservationRequests/${ownerId}`);
  }

  getReservations(userId: string): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(`${this.reservationUrl}/${userId}`);
  }

  update(reservationId: string, reservation: ReservationDTO): Observable<ReservationDTO> {
    return this.http.put<ReservationDTO>(`${this.reservationUrl}/${reservationId}`, reservation);
  }

  deleteReservationRequest(reservationId: string): Observable<void> {
    return this.http.delete<void>(`${this.reservationUrl}/reservationRequest/${reservationId}`);
  }
}
