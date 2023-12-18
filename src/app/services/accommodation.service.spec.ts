

///////////////////////////////////////////////////////////////////////////////////////
// NOTE: THESE TESTS ARE BASIC AND INCOMPLETE. THEY ARE NOT MEANT TO BE USED AS IS.  //
//       THEY SHOULD BE REVIEWED AND UPDATED TO PROPERLY TEST THE SERVICE.           //
///////////////////////////////////////////////////////////////////////////////////////


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AccommodationService } from './accommodation.service';
import { CreateAccommodationDTO } from '../models/create-accommodation-dto.model';
import { ApproveAccommodationDTO } from '../models/approve-accommodation-dto.model';
import { ChangeAccommodationDTO } from '../models/change-accommodation-dto.model';
import { GetAccommodationDTO } from '../models/get-accommodation-dto.model';
import { PricingType } from '../models/price-type.enum';
import { AccommodationStatus } from '../models/accommodation-status.enum';
import { AccommodationType } from '../models/accommodation-type.enum';


const changeAccommodationObj: ChangeAccommodationDTO = {
  Name: 'Test Accommodation',
  Description: 'Test Description',
  Location: 'Test Location',
  LocationCoordinates: [1, 1],
  MinGuests: 1,
  MaxGuests: 2,
  prices: [],
  PricingType: PricingType.Guest,
  DaysForCancellation: 1,
  Amenities: ['Test Amenity'],
  AccommodationStatus: AccommodationStatus.DENIED,
  Images: ['Test Image'],
  Type: AccommodationType.Apartment,
  AvaliableDates: [new Date()]
};

const createAccommodationObj: CreateAccommodationDTO = {
  Name: 'Test Accommodation',
  Description: 'Test Description',
  Location: 'Test Location',
  LocationCoordinates: [1, 1],
  MinGuests: 1,
  MaxGuests: 2,
  prices: [],
  PricingType: PricingType.Guest,
  DaysForCancellation: 1,
  Amenities: ['Test Amenity'],
  AccommodationStatus: AccommodationStatus.DENIED,
  Images: ['Test Image'],
  Type: AccommodationType.Apartment,
  AvaliableDates: [new Date()]
};

const getAccommodationObj: GetAccommodationDTO = {
  id: 1,
  Name: 'Test Accommodation',
  Description: 'Test Description',
  Location: 'Test Location',
  LocationCoordinates: [1, 1],
  MinGuests: 1,
  MaxGuests: 2,
  prices: [],
  PricingType: PricingType.Guest,
  DaysForCancellation: 1,
  Amenities: ['Test Amenity'],
  AccommodationStatus: AccommodationStatus.DENIED,
  Images: ['Test Image'],
  Type: AccommodationType.Apartment,
  AvaliableDates: [new Date()]
};

const approveAccommodationObj: ApproveAccommodationDTO = {
  Name: 'Test Accommodation',
  Description: 'Test Description',
  Location: 'Test Location',
  LocationCoordinates: [1, 1],
  MinGuests: 1,
  MaxGuests: 2,
  prices: [],
  PricingType: PricingType.Guest,
  DaysForCancellation: 1,
  Amenities: ['Test Amenity'],
  AccommodationStatus: AccommodationStatus.APPROVED,
  Images: ['Test Image'],
  Type: AccommodationType.Apartment,
  AvaliableDates: [new Date()]
};

const baseUrl: string = 'http://localhost:8080/api/v1';
const accommodationUrl: string = baseUrl + '/accommodation';
const favoriteUrl: string = accommodationUrl + '/favorite';
const approveUrl: string = accommodationUrl + '/approve';
const defineUrl: string = accommodationUrl + '/define'; // TODO: THIS IS NOT TESTED OR USED (DTO MISSING)

describe('AccommodationService', () => {
  describe('Unit tests', () => {

    let service: AccommodationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AccommodationService, HttpClient]
      });

      service = TestBed.inject(AccommodationService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify(); // Make sure that there are no outstanding requests.
    });

    it('should retrieve accommodation data', () => {
      const testAccommodationId = '1';

      // async function subscribing to the observable from service.get
      service.get(testAccommodationId).subscribe(accommodation => {
        // it asserts the response body when emitted.
        expect(accommodation).toEqual(getAccommodationObj);
      });

      ///////////////////////// fake server /////////////////////////
      // asserts and captures the intercepted HTTP request, checking that a single GET request was made to the correct URL.
      const req = httpMock.expectOne(`${service.accommodationUrl}/${testAccommodationId}`);

      expect(req.request.method).toBe('GET');

      // simulates the server's response to the request, providing fake response data.
      req.flush(getAccommodationObj);
      ///////////////////////////////////////////////////////////////
    });

    it('should create accommodation data', () => {
      service.create(createAccommodationObj).subscribe(response => {
        expect(response).toEqual(createAccommodationObj);
      });

      const req = httpMock.expectOne(service.accommodationUrl);
      expect(req.request.method).toBe('POST');
      req.flush(createAccommodationObj);
    });

    it('should update accommodation data', () => {
      const testAccommodationId = '1';

      service.update(testAccommodationId, changeAccommodationObj).subscribe(response => {
        expect(response).toEqual(changeAccommodationObj);
      });

      const req = httpMock.expectOne(`${service.accommodationUrl}/${testAccommodationId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(changeAccommodationObj);
    });

    it('should approve accommodation data', () => {
      const testAccommodationId = '1';

      service.approve(testAccommodationId, approveAccommodationObj).subscribe(response => {
        expect(response).toEqual(approveAccommodationObj);
      });

      const req = httpMock.expectOne(`${service.approveUrl}/${testAccommodationId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(approveAccommodationObj);
    });

    ///////////////////////// WE NEED A DEFINEACCOMMODATIONDTO WHATEVER THAT IS /////////////////////////
    //
    // it('should define accommodation data', () => {
    //   const testAccommodationId = '1';

    //   service.define(testAccommodationId, testAccommodation).subscribe(response => {
    //     expect(response).toEqual(testAccommodation);
    //   });

    //   const req = httpMock.expectOne(`${service.defineUrl}/${testAccommodationId}`);
    //   expect(req.request.method).toBe('PUT');
    //   req.flush(testAccommodation);
    // });
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////

  });

  describe('Integration tests', () => {

    let service: AccommodationService;
    let http: HttpClient;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [AccommodationService, HttpClient]
      });

      service = TestBed.inject(AccommodationService);
      http = TestBed.inject(HttpClient);
    });

    it('should retrieve accommodation data', (done) => {
      const testAccommodationId = '1';

      service.get(testAccommodationId).subscribe(response => {
        expect(response).toBeTruthy();
        // TODO: add check for actual data here when it becomes applicable

        done();  // force the test to wait until the observable is completed
      });
    });

    it('should create accommodation data', (done) => {
      service.create(createAccommodationObj).subscribe(response => {
        expect(response).toBeTruthy();
        // TODO: add check for actual data here when it becomes applicable

        done();
      });
    });

    it('should update accommodation data', (done) => {
      const testAccommodationId = '1';

      service.update(testAccommodationId, changeAccommodationObj).subscribe(response => {
        expect(response).toBeTruthy();
        // TODO: add check for actual data here when it becomes applicable

        done();
      });
    });

    it('should approve accommodation data', (done) => {
      const testAccommodationId = '1';

      service.approve(testAccommodationId, approveAccommodationObj).subscribe(response => {
        expect(response).toBeTruthy();
        // TODO: add check for actual data here when it becomes applicable

        done();
      });
    });

    ///////////////////////// WE NEED A DEFINEACCOMMODATIONDTO WHATEVER THAT IS /////////////////////////
    // it('should define accommodation data', () => {
    //   const testAccommodationId = '1';

    //   service.define(testAccommodationId, testAccommodation).subscribe(response => {
    //     expect(response).toBeTruthy();
    //     // TODO: add check for actual data here when it becomes applicable
    //   });
    // });
    //////////////////////////////////////////////////////////////////////////////////////////////////////
  });
});
