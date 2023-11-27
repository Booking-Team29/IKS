import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-type-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-type-switch.component.html',
  styleUrl: './account-type-switch.component.scss'
})
export class AccountTypeSwitchComponent {
  @Output() accountTypeChange = new EventEmitter<boolean>();
  isOwnerAccount: boolean = false;

  toggleAccountType() {
    this.isOwnerAccount = !this.isOwnerAccount;
    this.accountTypeChange.emit(this.isOwnerAccount);
  }
}
