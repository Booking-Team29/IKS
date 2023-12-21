import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenity-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amenity-card.component.html',
  styleUrl: './amenity-card.component.scss'
})
export class AmenityCardComponent {

  @Input() amenityName: any;

  name: string = "placeholder";
  ngOnChanges(changes: SimpleChanges) {
    if (changes['amenityName']) {
      this.name = this.amenityName;
    }
  }
}
