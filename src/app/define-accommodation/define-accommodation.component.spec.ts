import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineAccommodationComponent } from './define-accommodation.component';

describe('DefineAccommodationComponent', () => {
  let component: DefineAccommodationComponent;
  let fixture: ComponentFixture<DefineAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefineAccommodationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefineAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
