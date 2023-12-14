

///////////////////////////////////////////////////////////////////////////////////////
// NOTE: THESE TESTS ARE BASIC AND INCOMPLETE. THEY ARE NOT MEANT TO BE USED AS IS.  //
//       THEY SHOULD BE REVIEWED AND UPDATED TO PROPERLY TEST THE SERVICE.           //
///////////////////////////////////////////////////////////////////////////////////////


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReservationService } from './reservation.service';
import { ReservationDTO } from '../models/reservation-dto.model';
import { ReservationStatus } from '../models/reservation-status.enum';

const testReservationObj: ReservationDTO = {
  startDate: new Date(),
  endDate: new Date(),
  guestCount: 1,
  status: ReservationStatus.REQUESTED,
  totalPrice: 1
};

describe('ReservationService', () => {
  describe('Unit tests', () => {

    let service: ReservationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ReservationService, HttpClient]
      });

      service = TestBed.inject(ReservationService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify(); // Make sure that there are no outstanding requests.
    });

    it('should create a reservation', () => {
      service.create(testReservationObj).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(service.reservationUrl);
      expect(req.request.method).toBe('POST');
      req.flush(testReservationObj);
    });

    it('should get reservation requests', () => {
      const ownerId = '1';
      const reservations: ReservationDTO[] = [testReservationObj];
      service.getReservationRequests(ownerId).subscribe(response => {
        expect(response).toEqual(reservations);
      });

      const req = httpMock.expectOne(`${service.reservationUrl}/reservationRequests/${ownerId}`);
      expect(req.request.method).toBe('GET');
      req.flush(reservations);
    });

    it('should get reservations', () => {
      const userId = '1';
      const reservations: ReservationDTO[] = [testReservationObj];
      service.getReservations(userId).subscribe(response => {
        expect(response).toEqual(reservations);
      });

      const req = httpMock.expectOne(`${service.reservationUrl}/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(reservations);
    });

    it('should update a reservation', () => {
      const reservationId = '1';
      service.update(reservationId, testReservationObj).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${service.reservationUrl}/${reservationId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(testReservationObj);
    });

    it('should delete a reservation request', () => {
      const reservationId = '1';
      service.deleteReservationRequest(reservationId).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${service.reservationUrl}/reservationRequest/${reservationId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('Integration tests', () => {

    let service: ReservationService;
    let http: HttpClient;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [ReservationService, HttpClient]
      });

      service = TestBed.inject(ReservationService);
      http = TestBed.inject(HttpClient);
    });

    it('should create a reservation', (done) => {
      service.create(testReservationObj).subscribe(response => {
        expect(response).toBeTruthy();
        done();
      });
    });

    it('should get reservation requests', (done) => {
      const ownerId = '1';
      service.getReservationRequests(ownerId).subscribe(response => {
        expect(response).toBeTruthy();
        done();
      });
    });

    it('should get reservations', (done) => {
      const userId = '1';
      service.getReservations(userId).subscribe(response => {
        expect(response).toBeTruthy();
        done();
      });
    });

    it('should update a reservation', (done) => {
      const reservationId = '1';
      service.update(reservationId, testReservationObj).subscribe(response => {
        expect(response).toBeTruthy();
        done();
      });
    });

    it('should delete a reservation request', (done) => {
      const reservationId = '1';
      service.deleteReservationRequest(reservationId).subscribe(response => {
        expect(response).toBeNull();
        done();
      });
    });
  });
});
