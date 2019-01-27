import { TestBed } from '@angular/core/testing';

import { BillPositionService } from './bill-position.service';

describe('BillPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillPositionService = TestBed.get(BillPositionService);
    expect(service).toBeTruthy();
  });
});
