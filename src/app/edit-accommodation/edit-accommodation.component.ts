import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {AccommodationService} from "../services/accommodation.service";
import {Price} from "../models/price.model";
import {PriceType} from "../models/price-type.enum";
import {PricingType} from "../models/pricing-type.enum";
import {CreateAccommodationDTO} from "../models/create-accommodation-dto.model";
import {AccommodationType} from "../models/accommodation-type.enum";
import {AccommodationStatus} from "../models/accommodation-status.enum";

@Component({
  selector: 'app-edit-accommodation',
  standalone: true,
    imports: [
        DatePipe,
        NgForOf,
        NgIf
    ],
  templateUrl: './edit-accommodation.component.html',
  styleUrl: './edit-accommodation.component.scss'
})
export class EditAccommodationComponent {

  constructor(private accommodationService: AccommodationService) {
  }

  amenitiesList: string[] = [];
  dates: string[] = [];
  prices: Price[] = [];
  datesList: string[] = [];
  photosList: string[] = [];

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
      console.log('Lista fotografija:', this.photosList);
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
      this.dates.length > 0 &&
      cancel_days.trim() !== '')
      ;
  }

  addDate(): void {
    let dateValue = (document.getElementById('date') as HTMLInputElement).value;
    this.datesList.push(dateValue);
  }
  deleteDate(index: number): void {
    console.log('treba obrisat')
    this.datesList.splice(index, 1);
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
      avaliableDates: this.dates.map(dateString => new Date(dateString)),
      daysForCancellation: daysForCancellation
    };

    this.accommodationService.create(createAccommodationObj).subscribe(
      (response) => {
        console.log('Uspešno kreiran smeštaj:', response);
      },
      (error) => {
        console.error('Greška prilikom kreiranja smeštaja:', error);
        // Ovde možete dodati logiku za obradu greške ili prikazivanje odgovarajuće poruke korisniku
      }
    );
  }
}
