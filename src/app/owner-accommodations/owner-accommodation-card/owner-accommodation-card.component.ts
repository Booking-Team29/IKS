import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-owner-accommodation-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './owner-accommodation-card.component.html',
  styleUrl: './owner-accommodation-card.component.scss'
})
export class OwnerAccommodationCardComponent {
  @Input() image: String = '';
  @Input() description: String = '';
}
