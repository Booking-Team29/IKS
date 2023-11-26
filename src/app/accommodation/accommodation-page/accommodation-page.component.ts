import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenityCardComponent } from '../amenity-card/amenity-card.component';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { GalleryCarouselComponent } from '../gallery-carousel/gallery-carousel.component';

@Component({
  selector: 'app-accommodation-page',
  standalone: true,
  imports: [CommonModule, AmenityCardComponent, ReviewCardComponent, GalleryCarouselComponent],
  templateUrl: './accommodation-page.component.html',
  styleUrl: './accommodation-page.component.scss'
})
export class AccommodationPageComponent {

}
