import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypeSwitchComponent } from '../account-type-switch/account-type-switch.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, AccountTypeSwitchComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  onAccountTypeChange(isOwnerAccount: boolean) {
    console.log('Account type changed:', isOwnerAccount ? 'Owner' : 'Renter');
    // You can handle the change however you need to here
  }

  constructor(private router: Router) { }
  cancelEdit() {
    this.router.navigate(['/view-profile'])
  }
}
