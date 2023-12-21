import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccommodationDTO } from '../models/accommodation-dto.model';
import { ApproveAccommodationDTO } from '../models/approve-accommodation-dto.model';
import { ChangeAccommodationDTO } from '../models/change-accommodation-dto.model';
import { CreateAccommodationDTO } from '../models/create-accommodation-dto.model';
import { GetAccommodationDTO } from '../models/get-accommodation-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private _baseUrl: string = 'http://localhost:8080/api/v1';
  private _accommodationUrl: string;
  private _favoriteUrl: string;
  private _approveUrl: string;
  private _defineUrl: string;

  constructor(private http: HttpClient) {
    this._accommodationUrl = this._baseUrl + '/accommodation';

    this._favoriteUrl = this._accommodationUrl + '/favorite';
    this._approveUrl = this._accommodationUrl + '/approve';
    this._defineUrl = this._accommodationUrl + '/define'; // TODO: THIS IS NOT TESTED OR USED (DTO MISSING)
  }

  get accommodationUrl(): string {
    return this._accommodationUrl;
  }

  get favoriteUrl(): string {
    return this._favoriteUrl;
  }

  get approveUrl(): string {
    return this._approveUrl;
  }

  get defineUrl(): string {
    return this._defineUrl;
  }

  getFavorite(guestId: string): Observable<AccommodationDTO[]> {
    return this.http.get<AccommodationDTO[]>(`${this.favoriteUrl}/${guestId}`);
  }

  public search(numberOfPeople: Number, location: String, start: String, end: String): Observable<AccommodationDTO[]> {
    let url = this._accommodationUrl + '/accommodationSearch';
    url = url + `?location=${location}`;
    url = url + `&peopleNumber=${numberOfPeople}`;
    if (start && end) {
      url = url + `&start=${start}&end=${end}`;
    }
    return this.http.get<AccommodationDTO[]>(url);
  }

  getAll(): Observable<AccommodationDTO[]> {
    return this.http.get<AccommodationDTO[]>(`${this.accommodationUrl}`);
  }

  get(accommodationId: string): Observable<GetAccommodationDTO> {
    return this.http.get<GetAccommodationDTO>(`${this.accommodationUrl}/${accommodationId}`);
  }

  create(accommodation: CreateAccommodationDTO): Observable<CreateAccommodationDTO> {
    return this.http.post<CreateAccommodationDTO>(this.accommodationUrl, accommodation);
  }

  approve(id: string, accommodation: ApproveAccommodationDTO): Observable<ApproveAccommodationDTO> {
    return this.http.put<ApproveAccommodationDTO>(`${this.approveUrl}/${id}`, accommodation);
  }

  update(id: string, accommodation: ChangeAccommodationDTO): Observable<ChangeAccommodationDTO> {
    return this.http.put<ChangeAccommodationDTO>(`${this.accommodationUrl}/${id}`, accommodation);
  }

  define(id: string, accommodation: AccommodationDTO): Observable<AccommodationDTO> {
    return this.http.put<AccommodationDTO>(`${this.defineUrl}/${id}`, accommodation);
  }
}
