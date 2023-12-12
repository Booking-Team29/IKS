import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status } from '../accommodation/accommodation-status.enum';
import { Router } from '@angular/router';

const classSelectorMap: { [key in Status]: string } = {
    [Status.APPROVED]: 'status-approved',
    [Status.DECLINED]: 'status-declined',
    [Status.CREATED]: 'status-created',
    [Status.PENDING]: 'status-pending',
    [Status.CHANGED]: 'status-changed',
};

@Component({
  selector: 'app-approval-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approval-card.component.html',
  styleUrl: './approval-card.component.scss'
})
export class ApprovalCardComponent {
  private _status: Status;
  private _statusClassSelector: string;
  private _name: string;
  private _requestID;

  constructor(private router: Router) {
    this._requestID = 1; // impelelemnt :DDDDDDDd
    this._status = Status.CREATED;
    this._statusClassSelector = classSelectorMap[this._status];
    this._name = "Place (holder)";
  }

  @Input()
  set status(value: Status) {
    if (Object.values(Status).includes(value)) {
      this._status = value;
      this._statusClassSelector = classSelectorMap[this._status];
      console.log(this._statusClassSelector);
    } else {
      throw new Error(`Invalid status: ${value}`);
    }
  }

  get status(): Status {
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
    this._status = Status.APPROVED;
    this._statusClassSelector = classSelectorMap[Status.APPROVED];
  }

  declineRequest(requestID: number) {
    this._status = Status.DECLINED;
    this._statusClassSelector = classSelectorMap[Status.DECLINED];
  }

  openDetails(requestID: number) {
    this.router.navigate(['/view-accommodation-creation-request', requestID]);
  }
}
