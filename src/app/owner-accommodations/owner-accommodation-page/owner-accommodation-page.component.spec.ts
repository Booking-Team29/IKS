import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAccommodationPageComponent } from './owner-accommodation-page.component';

describe('OwnerAccommodationPageComponent', () => {
  let component: OwnerAccommodationPageComponent;
  let fixture: ComponentFixture<OwnerAccommodationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerAccommodationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerAccommodationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
