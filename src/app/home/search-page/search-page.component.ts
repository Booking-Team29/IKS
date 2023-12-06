import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { SearchResultCardComponent } from '../search-result-card/search-result-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SearchComponent, SearchResultCardComponent, FormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  lowestRating: number = 5;
  highestRating: number = 5;
  hotelChecked: Boolean = false;
  apartmentChecked: Boolean = false;
  studioChecked: Boolean = false;
  parkingChecked: Boolean = false;
  WiFiChecked: Boolean = false;
  petChecked: Boolean = false;
  balconyChecked: Boolean = false;
  airConditioningChecked: Boolean = false;
}
