import { TestBed } from '@angular/core/testing';

import { OemPrebookStockService } from './oem-prebook-stock.service';

describe('OemPrebookStockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OemPrebookStockService = TestBed.get(OemPrebookStockService);
    expect(service).toBeTruthy();
  });
});
