import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccommodationService} from "../services/accommodation.service";
import {AccommodationType} from "../models/accommodation-type.enum";
import {CreateAccommodationDTO} from "../models/create-accommodation-dto.model";
import {Price} from "../models/price.model";
import {PriceType} from "../models/price-type.enum";
import {AccommodationStatus} from "../models/accommodation-status.enum";
import {HttpClientModule} from "@angular/common/http";
import {PricingType} from "../models/pricing-type.enum";
import {AccommodationDTO} from "../models/accommodation-dto.model";
import {DateRange} from "../models/date-range.model";
import {ConfirmationMethod} from "../models/confirmation-method.enum";


@Component({
  selector: 'app-create-accommodation',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [AccommodationService],
  templateUrl: './create-accommodation.component.html',
  styleUrl: './create-accommodation.component.scss'
})
export class CreateAccommodationComponent {

  constructor(private accommodationService: AccommodationService) {
  }

  amenitiesList: string[] = [];
  dates: string[] = [];
  prices: Price[] = [];
  datesList: string[][] = [];
  photosList: string[] = [];
  dateRangeList: DateRange[] = [];
  private accommodationList: AccommodationDTO[] = [];

//  this.service.get(`${requestID}`).subscribe(response => {
//let accommodation = response;

  addPhoto(): void {
    let input = document.getElementById('photos-input') as HTMLInputElement;
    let selectedFiles = input.files; // Dobijanje izabranih fajlova

    // Provera da li je izabrano barem jedan fajl
    if (selectedFiles && selectedFiles.length > 0) {
      // Iteriranje kroz izabrane fajlove
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const filePath = URL.createObjectURL(file); // Dobijanje putanje fajla

        // Provera da li je slika već dodata u listu
        if (!this.photosList.includes(filePath)) {
          this.photosList.push(filePath);
        } else {
          console.log('Ova slika je već dodata.');
        }
      }

      // Ispisivanje liste stringova (putanja fotografija) u konzolu
      //console.log('Lista fotografija:', this.photosList);
      // Ovde možete dalje manipulisati listom fotografija prema vašim potrebama
    } else {
      console.log('Niste izabrali nijednu fotografiju.');
    }
  }
  deletePhoto(index: number): void {
    console.log('treba obrisat')
    this.photosList.splice(index, 1);
  }
  addAmenity(): void {
    let selectedAmenity = (document.getElementById('amenities-select') as HTMLInputElement).value;
    if (!this.amenitiesList.includes(selectedAmenity)){
      this.amenitiesList.push(selectedAmenity);
    }else{
      console.log('VEC POSTOJI');
    }
  }
  deleteAmenity(index: number): void {
    console.log('treba obrisat')
    this.amenitiesList.splice(index, 1);
  }

  checkGuests(): boolean {
    let minGuests = +(document.getElementById('min_guests') as HTMLInputElement).value;
    let maxGuests = +(document.getElementById('max_guests') as HTMLInputElement).value;
    return maxGuests >= minGuests;
  }

  checkAllFieldsEntered(): boolean {
    let name = (document.getElementById('name') as HTMLInputElement).value;
    let description = (document.getElementById('description') as HTMLInputElement).value;
    let location = (document.getElementById('location') as HTMLInputElement).value;
    let minGuests = (document.getElementById('min_guests') as HTMLInputElement).value;
    let maxGuests = (document.getElementById('max_guests') as HTMLInputElement).value;
    let type = (document.getElementById('accommodation_type') as HTMLSelectElement).value;
    let cancel_days = (document.getElementById('cancel-days-input') as HTMLInputElement).value;
    let pricingType = (document.getElementById('type-pricing') as HTMLSelectElement).value;
    console.log(name);
    console.log(description);
    console.log(this.amenitiesList);
    console.log(this.photosList);
    console.log(this.prices);
    console.log(minGuests);
    console.log(maxGuests);
    console.log(pricingType);
    console.log(location);
    console.log(type);
    console.log(this.dateRangeList);
    console.log(cancel_days);



    return (
        name.trim() !== '' &&
        description.trim() !== '' &&
        this.amenitiesList.length > 0 &&
        this.photosList.length > 0 && // Provjera da li su slike izabrane
      this.prices.length > 0 &&
      minGuests.trim() !== '' &&
      maxGuests.trim() !== '' &&
      pricingType.trim() !== '' &&
      location.trim() !== '' &&
      type.trim() !== '' &&
      this.datesList.length > 0 &&
      cancel_days.trim() !== '')
      ;
  }

  addDateRange(): void {
    let startDateValue = (document.getElementById('start-date') as HTMLInputElement).value;
    let endDateValue = (document.getElementById('end-date') as HTMLInputElement).value;

    if (this.checkDateRange(startDateValue, endDateValue)) {
      this.datesList.push([startDateValue, endDateValue]);
      console.log('Datumi uspešno dodati.');
    } else {
      console.log('Datumi nisu validni, nisu dodati.');
    }
  }
  deleteDateRange(index: number): void {
    console.log('treba obrisat')
    this.datesList.splice(index, 1);
  }
  checkDateRange(startDateString: string, endDateString: string): boolean {
    // Provera da li su uneti datumi u ispravnom formatu
    let startDate = new Date(startDateString);
    let endDate = new Date(endDateString);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.log('Neispravan format datuma.');
      return false;
    }

    // Provera da li je početni datum manji od krajnjeg
    if (startDate >= endDate) {
      console.log('Početni datum mora biti manji od krajnjeg datuma.');
      return false;
    }

    // Provera da li se uneti datumi poklapaju sa datumima iz liste
    for (let [existingStartDate, existingEndDate] of this.datesList) {
      let existingStart = new Date(existingStartDate);
      let existingEnd = new Date(existingEndDate);

      if ((startDate >= existingStart && startDate <= existingEnd) ||
          (endDate >= existingStart && endDate <= existingEnd) ||
          (startDate <= existingStart && endDate >= existingEnd)) {
        console.log('Uneti datumi se poklapaju sa već postojećim datumima.');
        return false;
      }
    }

    // Ako su svi uslovi ispunjeni, datumi su validni
    return true;
  }


  addPrice(): void {
    let startDate = (document.getElementById('price-start-date') as HTMLInputElement).value;
    let endDate = (document.getElementById('price-end-date') as HTMLInputElement).value;
    let price = (document.getElementById('price-input') as HTMLInputElement).value;
    let priceType = (document.getElementById('price_type') as HTMLSelectElement).value;

    if (startDate.trim() == '' || endDate.trim() == '' || price.trim() == '' || priceType.trim() == '') {
      console.log('Molimo popunite sva polja.');
      return;
    }

    // Provera ispravnosti formata datuma
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      console.log('Uneti datumi nisu validni.');
      return;
    }
    // Provera da li je startDate veći od endDate
    if (startDateObj >= endDateObj) {
      console.log('Start datum treba da bude manji od End datuma.');
      return;
    }
    for (let existingPrice of this.prices) {
      if (
          (startDateObj >= existingPrice.start && startDateObj <= existingPrice.end) ||
          (endDateObj >= existingPrice.start && endDateObj <= existingPrice.end) ||
          (startDateObj <= existingPrice.start && endDateObj >= existingPrice.end)
      ) {
        console.log('Uneti datumi se poklapaju sa postojećim cenama.');
        return;
      }
    }

    let selectedPriceType: PriceType;
    // Postavljanje PriceType na temelju odabira korisnika
    if (priceType.trim().toLowerCase() === 'custom') {
      selectedPriceType = PriceType.CUSTOM;
    } else if (priceType.trim().toLowerCase() === 'weekend') {
      selectedPriceType = PriceType.WEEKEND;
    } else {
      console.log('Nepoznata vrsta cijene.');
      return;
    }
    const newPrice: Price = {
      type: selectedPriceType,
      price: parseFloat(price), // Pretvaranje cijene iz stringa u broj
      start: startDateObj,
      end: endDateObj
    };
    console.log('USPJESNO');
    this.prices.push(newPrice);
    // Dodavanje cene u tekstualno polje (textarea)
  }
  deletePrice(index: number): void {
    console.log('treba obrisat')
    this.prices.splice(index, 1);
  }

  onCreateClick(): void {
    let name = (document.getElementById('name') as HTMLInputElement).value;
    let description = (document.getElementById('description') as HTMLInputElement).value;
    let location = (document.getElementById('location') as HTMLInputElement).value;
    let minGuests = parseInt((document.getElementById('min_guests') as HTMLInputElement).value, 10);
    let maxGuests = parseInt((document.getElementById('max_guests') as HTMLInputElement).value, 10);
    let accommodationType = (document.getElementById('accommodation_type') as HTMLSelectElement).value;
    let daysForCancellation = parseInt((document.getElementById('cancel-days-input') as HTMLInputElement).value, 10);
    let pricingType = (document.getElementById('type-pricing') as HTMLSelectElement).value;

    if (this.checkAllFieldsEntered()) {
      console.log('SVA POLJA SU UNIJETA');
      // Dodatne radnje ako su uslovi ispunjeni
    } else {
      console.log('NISU SVA POLJA UNIJETA');
      return;
    }

    let selectedPriceType: PricingType;
    // Postavljanje PriceType na temelju odabira korisnika
    if (pricingType.trim().toLowerCase() === 'guest') {
      selectedPriceType = PricingType.GUEST;
    } else{
      selectedPriceType = PricingType.ACCOMMODATION;
    }

    let createAccommodationObj: CreateAccommodationDTO = {
      name: name,
      description: description,
      location: location,
      locationCoordinates: [1,1],
      minGuests: minGuests,
      maxGuests: maxGuests,
      type: accommodationType as AccommodationType, // Potrebno je cast-ovanje tipa
      prices: this.prices,
      pricingType : selectedPriceType,
      amenities: this.amenitiesList,
      accommodationStatus: AccommodationStatus.CREATED,
      images:this.photosList,
      avaliableDates: this.dateRangeList = this.datesList.map(dateArray => ({ startDate: new Date(dateArray[0]), endDate: new Date(dateArray[1]) })),
      daysForCancellation: daysForCancellation,
      confirmationMethod: ConfirmationMethod.MANUAL
    };

    this.accommodationService.create(createAccommodationObj).subscribe(
      (response) => {
        console.log('Uspešno kreiran smeštaj:', response);
        alert('Uspešno kreiran smeštaj:');
      },
      (error) => {
        console.error('Greška prilikom kreiranja smeštaja:', error);
        // Ovde možete dodati logiku za obradu greške ili prikazivanje odgovarajuće poruke korisniku
      }
    );
  }
}
