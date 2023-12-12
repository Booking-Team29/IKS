import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalCardComponent } from '../../approval-card/approval-card.component';
import { UserRequestStatus } from '../../user-request-status.enum';

@Component({
  selector: 'app-accommodation-creation-requests',
  standalone: true,
  imports: [CommonModule, ApprovalCardComponent],
  templateUrl: './accommodation-creation-requests.component.html',
  styleUrl: './accommodation-creation-requests.component.scss'
})
export class AccommodationCreationRequestsComponent implements OnInit {

  requests!: any[]; // actual requests data type
  Status = UserRequestStatus;

  constructor() { }

  ngOnInit(): void {
    // initialize requests here, probably fetching from a service
  }

  onApprove(request: any): void {
    // handle approve logic, such as updating the request status
  }

  onDecline(request: any): void {
    // handle decline logic, such as removing the request or updating status
  }
}

