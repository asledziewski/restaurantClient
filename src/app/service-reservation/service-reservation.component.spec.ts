import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReservationComponent } from './service-reservation.component';

describe('ServiceReservationComponent', () => {
  let component: ServiceReservationComponent;
  let fixture: ComponentFixture<ServiceReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
