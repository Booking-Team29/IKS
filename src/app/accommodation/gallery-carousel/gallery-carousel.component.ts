import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  template: `
      <gallery [items]="images"></gallery>
  `,
  selector: 'app-gallery-carousel',
  standalone: true,
  imports: [GalleryModule],
  templateUrl: './gallery-carousel.component.html',
  styleUrl: './gallery-carousel.component.scss'
})
export class GalleryCarouselComponent {
  images: GalleryItem[] = [];

  ngOnInit() {
    this.images = [
      new ImageItem({ src: 'https://www.savills.co.uk/_images/adobestock-539646437.jpg', thumb: 'https://www.savills.co.uk/_images/adobestock-539646437.jpg' }),
      new ImageItem({ src: 'https://www.savills.co.uk/_images/adobestock-539646437.jpg', thumb: 'https://www.savills.co.uk/_images/adobestock-539646437.jpg' }),
      new ImageItem({ src: 'https://www.savills.co.uk/_images/adobestock-539646437.jpg', thumb: 'https://www.savills.co.uk/_images/adobestock-539646437.jpg' }),
    ]
  }
}