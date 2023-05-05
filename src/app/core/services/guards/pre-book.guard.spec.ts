import { TestBed, async, inject } from '@angular/core/testing';

import { PreBookGuard } from './pre-book.guard';

describe('PreBookGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreBookGuard]
    });
  });

  it('should ...', inject([PreBookGuard], (guard: PreBookGuard) => {
    expect(guard).toBeTruthy();
  }));
});
