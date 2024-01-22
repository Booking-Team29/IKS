import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenityCardComponent } from '../amenity-card/amenity-card.component';
import { ReviewCardComponent } from '../review-card/review-card.component';
import { GalleryCarouselComponent } from '../gallery-carousel/gallery-carousel.component';
import { AccommodationService } from '../../services/accommodation.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReservationDTO } from '../../models/reservation-dto.model';
import { ReservationStatus } from '../../models/reservation-status.enum';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-accommodation-page',
  standalone: true,
  imports: [CommonModule, AmenityCardComponent, ReviewCardComponent, GalleryCarouselComponent, HttpClientModule, FormsModule],
  providers: [AccommodationService, ReservationService],
  templateUrl: './accommodation-page.component.html',
  styleUrl: './accommodation-page.component.scss'
})
export class AccommodationPageComponent {

  public constructor(
    private service: AccommodationService,
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {
    this.service = service;
    this.route = route;
    this.reservationService = reservationService;
  }

  public accommodationData: any;
  public startDate: string = '';
  public endDate: string = '';
  public numberOfGuests: number = 1;
  public error: Boolean = false;
  public errorMessage: string = '';

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
  }

  onSubmit() {
    this.error = false;
    if (this.startDate.length == 0 || this.endDate.length == 0 || this.numberOfGuests == null) {
      this.errorMessage = 'All fields must be field with valid data';
      this.error = true;
      return;
    }

    let checkInDate = new Date(this.startDate);
    let checkOutDate = new Date(this.endDate);

    let today = new Date();
    if (checkInDate <= today) {
      this.errorMessage = 'Check in date has to tomorrow or later';
      this.error = true;
      return;
    }

    if (checkInDate > checkOutDate) {
      this.errorMessage = 'Check in date has to be before the check out date';
      this.error = true;
      return;
    }

    if (this.numberOfGuests > this.accommodationData.maxGuests){
      this.errorMessage = 'Accommodation cannot accommodate that many guests';
      this.error = true;
      return;
    }

    if (this.numberOfGuests < this.accommodationData.minGuests){
      this.errorMessage = 'Accommodation cannot accommodate that many guests';
      this.error = true;
      return;
    }

    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    let timeDifference = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    let dayDiff = Math.ceil(timeDifference / millisecondsPerDay) + 1;

    let dto: ReservationDTO = {
      startDate: checkInDate,
      endDate: checkOutDate,
      guestCount: this.numberOfGuests,
      status: ReservationStatus.ACTIVE,
      totalPrice: dayDiff * this.accommodationData.prices[0].amount,
      accommodationId: this.accommodationData.id
    }
    let resp = this.reservationService.create(dto);
    resp.subscribe(
      err => {
        this.error = true;
        this.errorMessage = 'Error creating a reservation'
      }
    )
  }
}
