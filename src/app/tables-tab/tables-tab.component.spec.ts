import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesTabComponent } from './tables-tab.component';

describe('TablesTabComponent', () => {
  let component: TablesTabComponent;
  let fixture: ComponentFixture<TablesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
