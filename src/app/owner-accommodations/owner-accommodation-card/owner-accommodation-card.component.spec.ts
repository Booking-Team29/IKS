import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAccommodationCardComponent } from './owner-accommodation-card.component';

describe('OwnerAccommodationCardComponent', () => {
  let component: OwnerAccommodationCardComponent;
  let fixture: ComponentFixture<OwnerAccommodationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerAccommodationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerAccommodationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
