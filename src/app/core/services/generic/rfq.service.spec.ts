import { TestBed } from '@angular/core/testing';

import { RfqService } from './rfq.service';

describe('RfqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RfqService = TestBed.get(RfqService);
    expect(service).toBeTruthy();
  });
});
