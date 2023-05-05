import { TestBed } from '@angular/core/testing';

import { CartV2Service } from './cart-v2.service';

describe('CartV2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartV2Service = TestBed.get(CartV2Service);
    expect(service).toBeTruthy();
  });
});
