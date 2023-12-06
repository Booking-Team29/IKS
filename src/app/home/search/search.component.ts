import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  destination: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  numberOfPeople: number = 1;
  roomType: string = '';
  lowestRating: number = 5;
  highestRating: number = 10;



  search() {
    // TODO: actual logic
    console.log('Search clicked:', this.destination, this.checkInDate, this.checkOutDate, this.numberOfPeople, this.roomType);
  }
}