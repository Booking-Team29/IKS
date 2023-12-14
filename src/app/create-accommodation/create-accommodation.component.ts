import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import { AccommodationService} from "../services/accommodation.service";
import {AccommodationType} from "../models/accommodation-type.enum";
import {CreateAccommodationDTO} from "../models/create-accommodation-dto.model";
import {Price} from "../models/price.model";
import {PricingType} from "../models/price-type.enum";
import {AccommodationStatus} from "../models/accommodation-status.enum";
import {HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-create-accommodation',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [AccommodationService],
  templateUrl: './create-accommodation.component.html',
  styleUrl: './create-accommodation.component.scss'
})
export class CreateAccommodationComponent {

  constructor(private accommodationService: AccommodationService) {}
  amenitiesList: string[] = [];
  amenitiesLabelText: string = ''; // Koristimo odgovarajući tip za tekst koji će se prikazivati
  dateRanges: { startDate: string, endDate: string }[] = []; // Inicijalizacija niza za čuvanje date range-ova
  dates: string[] = [];
  dateRangeText : string = '';
  prices: Price[] = [];

  addAmenity(): void {
    const selectedAmenity = (document.getElementById('amenities-select') as HTMLSelectElement).value;
    if (!this.amenitiesList.includes(selectedAmenity)) {
      this.amenitiesList.push(selectedAmenity);
      this.amenitiesLabelText = this.amenitiesList.join(', '); // Postavljamo tekst za prikaz
    }
  }
  checkGuests(): boolean {
    const minGuests = +(document.getElementById('min_guests') as HTMLInputElement).value;
    const maxGuests = +(document.getElementById('max_guests') as HTMLInputElement).value;
    return maxGuests >= minGuests;
  }

  // checkDates(): boolean {
  //   const startDate = new Date((document.getElementById('start_date') as HTMLInputElement).value);
  //   const endDate = new Date((document.getElementById('end_date') as HTMLInputElement).value);
  //   return startDate < endDate;
  // }

  checkAllFieldsEntered(): boolean {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;
    const minGuests = (document.getElementById('min_guests') as HTMLInputElement).value;
    const maxGuests = (document.getElementById('max_guests') as HTMLInputElement).value;
    const price = (document.getElementById('price') as HTMLInputElement).value;

    const fileInput = (document.getElementById('photos') as HTMLInputElement);
    const selectedFiles = fileInput.files;

    return (
      name.trim() !== '' &&
      description.trim() !== '' &&
      location.trim() !== '' &&
      minGuests.trim() !== '' &&
      maxGuests.trim() !== '' &&
      price.trim() !== '' &&
      (selectedFiles !== null && selectedFiles.length > 0) // Provjera da li su slike izabrane
      // Dodaj dodatne provjere prema potrebi
    );
  }

  addDateRange(): void {
    const startDateValue = (document.getElementById('start_date') as HTMLInputElement).value;
    //const endDateValue = (document.getElementById('end_date') as HTMLInputElement).value;

    // Provera da li su oba polja popunjena
    // if (startDateValue.trim() === '' || endDateValue.trim() === '') {
    //   console.log('Molimo unesite oba datuma.');
    //   return; // Prekida izvršavanje funkcije ako nisu uneseni oba datuma
    // }

    // Provera ispravnosti formata datuma
    // const startDate = new Date(startDateValue);
    // const endDate = new Date(endDateValue);

    // if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    //   console.log('Uneti datumi nisu validni.');
    //   return; // Prekida izvršavanje funkcije ako datumi nisu validni
    // }

    // Provera da li je startDate manji od endDate
    // if (startDate >= endDate) {
    //   console.log('Start datum treba da bude manji od End datuma.');
    //   return; // Prekida izvršavanje funkcije ako startDate nije manji od endDate
    // }

    // Dodavanje validnog date range-a u niz
    //this.dateRanges.push({ startDate: startDateValue, endDate: endDateValue });
    this.dates.push(startDateValue);
    //console.log('Dodat je novi date range:', { startDate: startDateValue, endDate: endDateValue });
    this.dateRangeText = this.dates.map(date => `Date: ${date}`).join('\n');
    //this.dateRangeText = this.dateRanges.map(range => `Start: ${range.startDate}, End: ${range.endDate}`).join('\n');
  }
  addPrice(): void {
    const startDate = (document.getElementById('price-start-date') as HTMLInputElement).value;
    const endDate = (document.getElementById('price-end-date') as HTMLInputElement).value;
    const price = (document.getElementById('price-input') as HTMLInputElement).value;
    const priceType = (document.getElementById('price_type') as HTMLSelectElement).value;
    const pricesTextarea = document.getElementById('prices') as HTMLTextAreaElement;
    console.log("aloo");
    // Provera da li su sva polja popunjena
    if (startDate.trim() == '' || endDate.trim() == '' || price.trim() == '' || priceType.trim() == '') {
      console.log('Molimo popunite sva polja.');
      return; // Prekida izvršavanje funkcije ako nisu uneseni svi podaci
    }

    // Provera ispravnosti formata datuma
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      console.log('Uneti datumi nisu validni.');
      return; // Prekida izvršavanje funkcije ako datumi nisu validni
    }

    // Provera da li je startDate veći od endDate
    if (startDateObj >= endDateObj) {
      console.log('Start datum treba da bude manji od End datuma.');
      return; // Prekida izvršavanje funkcije ako startDate nije manji od endDate
    }
    let selectedPriceType: PricingType;
    console.log(priceType.trim().toLowerCase())
    // Postavljanje PriceType na temelju odabira korisnika
    if (priceType.trim().toLowerCase() == 'per-guest') {
      selectedPriceType = PricingType.Guest;
    } else if (priceType.trim().toLowerCase() == 'per-apartment') {
      selectedPriceType = PricingType.Accommodation;
    } else {
      console.log('Nepoznata vrsta cijene.');
      return; // Prekida izvršavanje funkcije ako nije odabrana validna vrsta cijene
    }
    const newPrice: Price = {
      Type: selectedPriceType,
      price: parseFloat(price), // Pretvaranje cijene iz stringa u broj
      start: startDateObj,
      end: endDateObj
    };
    this.prices.push(newPrice);
    // Dodavanje cene u tekstualno polje (textarea)
    pricesTextarea.value += `Start: ${startDate}, End: ${endDate}, Price: ${price}, Type: ${priceType}\n`;
  }

  onCreateClick(): void {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;
    const location = (document.getElementById('location') as HTMLInputElement).value;
    const minGuests = parseInt((document.getElementById('min_guests') as HTMLInputElement).value, 10);
    const maxGuests = parseInt((document.getElementById('max_guests') as HTMLInputElement).value, 10);
    const accommodationType = (document.getElementById('accommodation_type') as HTMLSelectElement).value;
    const amenities = this.amenitiesList;
    const daysForCancelation = parseInt((document.getElementById('cancel-days-input') as HTMLInputElement).value, 10);

    // Dodajte ostala polja iz forme
    const createAccommodationObj: CreateAccommodationDTO = {
      Name: name,
      Description: description,
      Location: location,
      LocationCoordinates: [1,1],
      MinGuests: minGuests,
      MaxGuests: maxGuests,
      Type: accommodationType as AccommodationType, // Potrebno je cast-ovanje tipa
      prices: this.prices,
      PricingType : PricingType.Accommodation,
      Amenities: this.amenitiesList,
      AccommodationStatus: AccommodationStatus.Created,
      Images:['slika'],
      AvaliableDates: this.dates.map(dateString => new Date(dateString)),
      DaysForCancellation: daysForCancelation
    };
    // Name: string;
    // Description: string;
    // Location: string;
    // LocationCoordinates: number[];
    // MinGuests: number;
    // MaxGuests: number;
    // prices: Price[];
    // PricingType: PricingType;
    // DaysForCancellation: number;
    // Amenities: string[];
    // AccommodationStatus: AccommodationStatus;
    // Images: string[];
    // Type: AccommodationType;
    // AvaliableDates: Date[];


    // if (this.checkAllFieldsEntered()) {
      this.accommodationService.create(createAccommodationObj).subscribe(
        (response) => {
          console.log('Uspešno kreiran smještaj:', response);
          // Ovde možete dodati logiku nakon uspešnog kreiranja smještaja
        }
        // (error) => {
        //   console.error('Greška prilikom kreiranja smještaja:', error);
        //   // Ovde možete dodati logiku za rukovanje greškama
        // }
      );
    // } else {
    //   console.log('Nisu popunjena sva polja.');
    //   // Ovde možete dodati logiku ako nisu popunjena sva polja
    // }
  }
}
