import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result-card.component.html',
  styleUrl: './search-result-card.component.scss'
})
export class SearchResultCardComponent {
    constructor(private router: Router) { }
    @Input() result: any;

  navigate() {
    this.router.navigate([`/accommodation/${this.result.id}`])
  }
}
