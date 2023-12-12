import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestStatus } from '../user-request-status.enum';
import { Router } from '@angular/router';

const classSelectorMap: { [key in UserRequestStatus]: string } = {
    [UserRequestStatus.APPROVED]: 'status-approved',
    [UserRequestStatus.DECLINED]: 'status-declined',
    [UserRequestStatus.CREATED]: 'status-created',
    [UserRequestStatus.PENDING]: 'status-pending',
    [UserRequestStatus.CHANGED]: 'status-changed',
};

@Component({
  selector: 'app-approval-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approval-card.component.html',
  styleUrl: './approval-card.component.scss'
})
export class ApprovalCardComponent {
  private _status: UserRequestStatus;
  private _statusClassSelector: string;
  private _name: string;
  private _requestID;

  constructor(private router: Router) {
    this._requestID = 1; // impelelemnt :DDDDDDDd
    this._status = UserRequestStatus.CREATED;
    this._statusClassSelector = classSelectorMap[this._status];
    this._name = "Place (holder)";
  }

  @Input()
  set status(value: UserRequestStatus) {
    if (Object.values(UserRequestStatus).includes(value)) {
      this._status = value;
      this._statusClassSelector = classSelectorMap[this._status];
    } else {
      throw new Error(`Invalid status: ${value}`);
    }
  }

  get status(): UserRequestStatus {
    return this._status;
  }

  @Input()
  set name(value: string) {
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  get statusClassSelector(): string {
    return this._statusClassSelector;
  }

  get requestID(): number {
    return this._requestID;
  }

  approveRequest(requestID: number) {
    this._status = UserRequestStatus.APPROVED;
    this._statusClassSelector = classSelectorMap[UserRequestStatus.APPROVED];
  }

  declineRequest(requestID: number) {
    this._status = UserRequestStatus.DECLINED;
    this._statusClassSelector = classSelectorMap[UserRequestStatus.DECLINED];
  }

  openDetails(requestID: number) {
    this.router.navigate(['/view-accommodation-creation-request', requestID]);
  }
}
