import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalCardComponent } from '../../approval-card/approval-card.component';
import { UserRequestStatus } from '../../user-request-status.enum';
import { AccommodationService } from '../../services/accommodation.service';
import { AccommodationDTO } from '../../models/accommodation-dto.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-accommodation-creation-requests',
  standalone: true,
  imports: [CommonModule, ApprovalCardComponent, HttpClientModule],
  providers: [AccommodationService],
  templateUrl: './accommodation-creation-requests.component.html',
  styleUrl: './accommodation-creation-requests.component.scss'
})
export class AccommodationCreationRequestsComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<AccommodationDTO[]>(); // data type

  requests: any[] = []; // actual requests data type
  UserRequestStatus = UserRequestStatus;
  constructor(
    private service: AccommodationService
  ) {
    this.service = service;
  }

  ngOnInit(): void {
    let data = this.service.getAll();

    // data.subscribe(
    //   data => this.dataEvent.emit(data),
    //   error => console.log(error)
    // )

    data.subscribe(
      data => this.requests = data,
      error => console.log(error)
    )

    // initialize requests here, probably fetching from a service
  }

  loadFetchedRequests(data: AccommodationDTO[]) {
    this.requests = data;
  }

  onApprove(request: any): void {
    // handle approve logic, such as updating the request status
  }

  onDecline(request: any): void {
    // handle decline logic, such as removing the request or updating status
  }
}

