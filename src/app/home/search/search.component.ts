import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccommodationService } from '../../services/accommodation.service';
import { AccommodationDTO } from '../../models/accommodation-dto.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AccommodationService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() dataEvent = new EventEmitter<AccommodationDTO[]>()
  destination: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  numberOfPeople: number = 1;

  constructor(
    private service: AccommodationService
  ) {
    this.service = service;
  }


  search() {
    let data = this.service.search(
      this.numberOfPeople, 
      this.destination, 
      this.checkInDate, 
      this.checkOutDate
      );
    data.subscribe(
      data => this.dataEvent.emit(data),
      error => console.error(error)
    )
  }
}