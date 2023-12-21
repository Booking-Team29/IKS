import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenityCardComponent } from '../amenity-card/amenity-card.component';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { GalleryCarouselComponent } from '../gallery-carousel/gallery-carousel.component';
import { AccommodationService } from '../../services/accommodation.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accommodation-page',
  standalone: true,
  imports: [CommonModule, AmenityCardComponent, ReviewCardComponent, GalleryCarouselComponent, HttpClientModule],
  providers: [AccommodationService],
  templateUrl: './accommodation-page.component.html',
  styleUrl: './accommodation-page.component.scss'
})
export class AccommodationPageComponent {

  public constructor(
    private service: AccommodationService,
    private route: ActivatedRoute
  ) {
    this.service = service;
    this.route = route;
  }

  public accommodationData: any;

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.log("No id provided");
      return;
    }

    let data = this.service.get(id);

    data.subscribe(
      data => this.accommodationData = data,
      error => console.log(error)
    )

    // initialize requests here, probably fetching from a service
  }
}
