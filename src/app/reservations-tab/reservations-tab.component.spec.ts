import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsTabComponent } from './reservations-tab.component';

describe('ReservationsTabComponent', () => {
  let component: ReservationsTabComponent;
  let fixture: ComponentFixture<ReservationsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
