import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypeSwitchComponent } from '../account-type-switch/account-type-switch.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, AccountTypeSwitchComponent, ConfirmationModalComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  @ViewChild('confirmationModal') confirmationModal!: ConfirmationModalComponent;

  onAccountTypeChange(isOwnerAccount: boolean) {
    console.log('Account type changed:', isOwnerAccount ? 'Owner' : 'Renter');
    // You can handle the change however you need to here
  }

  constructor(private router: Router) { }
  cancelEdit() {
    this.router.navigate(['/view-profile'])
  }

  deleteAccount() {
    console.log('Deleting account...');
  }
}
