import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { SearchResultCardComponent } from '../search-result-card/search-result-card.component';
import { FormsModule } from '@angular/forms';
import { Accommodation } from '../../models/accommodation.model';
import { AccommodationDTO } from '../../models/accommodation-dto.model';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SearchComponent, SearchResultCardComponent, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  lowestRating: number = 5;
  highestRating: number = 10;
  hotelChecked: Boolean = false;
  apartmentChecked: Boolean = false;
  studioChecked: Boolean = false;

  parkingChecked: Boolean = false;
  WiFiChecked: Boolean = false;
  petChecked: Boolean = false;
  balconyChecked: Boolean = false;
  airConditioningChecked: Boolean = false;

  results: any[] = [];

  receiveSearchResults(data: AccommodationDTO[]) {
    let new_results = []
    for (const acc of data) {
      // TODO: rating
      if (this.hotelChecked && acc.type != "HOTEL") continue;
      if (this.apartmentChecked && acc.type != "APARTMENT") continue;
      if (this.studioChecked && acc.type != "STUDIO") continue;

      if (this.WiFiChecked && !acc.amenities.includes("Wi-Fi")) continue;
      if (this.petChecked && !acc.amenities.includes("Pet")) continue;
      if (this.balconyChecked && !acc.amenities.includes("Balcony")) continue;
      if (this.airConditioningChecked && !acc.amenities.includes("AirConditioning")) continue;
      new_results.push(acc);
    }
    this.results = new_results;
  }
}
