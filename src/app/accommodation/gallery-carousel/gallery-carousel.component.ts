import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-gallery-carousel',
  standalone: true,
  imports: [GalleryModule],
  templateUrl: './gallery-carousel.component.html',
  styleUrl: './gallery-carousel.component.scss'
})
export class GalleryCarouselComponent {
  images: GalleryItem[] = [];

  @Input() data: any;

 //  ngOnInit() {
 //    this.images = [
 //      new ImageItem({ src: this.data.images[0], thumb: this.data.images[0]}),
 //      new ImageItem({ src: this.data.images[1], thumb: this.data.images[1]}),
 //    ]
 //  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.data);

      // for some reason it works here?
      this.images = [
        new ImageItem({ src: this.data[0], thumb: this.data[0]}),
        new ImageItem({ src: this.data[1], thumb: this.data[1]}),
      ]

    if (changes['data'] && this.data && Array.isArray(this.data.images)) {
      // but not here???
      console.log( "hello"  + this.data)
      this.images = [
        new ImageItem({ src: this.data[0], thumb: this.data[0]}),
        new ImageItem({ src: this.data[1], thumb: this.data[1]}),
      ]
    }
  }
}
