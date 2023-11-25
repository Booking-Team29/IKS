import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { SearchResultCardComponent } from '../search-result-card/search-result-card.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SearchComponent, SearchResultCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

}
