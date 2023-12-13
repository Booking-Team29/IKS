import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerAccommodationCardComponent } from '../owner-accommodation-card/owner-accommodation-card.component';

@Component({
  selector: 'app-owner-accommodation-page',
  standalone: true,
  imports: [CommonModule, OwnerAccommodationCardComponent],
  templateUrl: './owner-accommodation-page.component.html',
  styleUrl: './owner-accommodation-page.component.scss'
})
export class OwnerAccommodationPageComponent {
  description: String = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  image: String = "https://23c133e0c1637be1e07d-be55c16c6d91e6ac40d594f7e280b390.ssl.cf1.rackcdn.com/u/gpch/Park-Hotel-Group---Explore---Grand-Park-City-Hall-Facade.jpg";
}
