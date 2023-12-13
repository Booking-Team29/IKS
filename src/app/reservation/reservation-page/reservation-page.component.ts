import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenityCardComponent } from '../../accommodation/amenity-card/amenity-card.component';
import { ReviewCardComponent } from '../../accommodation/review-card/review-card.component';
import { GalleryCarouselComponent } from '../../accommodation/gallery-carousel/gallery-carousel.component';

@Component({
  selector: 'app-reservation-page',
  standalone: true,
  imports: [CommonModule, AmenityCardComponent, ReviewCardComponent, GalleryCarouselComponent],
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.scss'
})
export class ReservationPageComponent {

}
