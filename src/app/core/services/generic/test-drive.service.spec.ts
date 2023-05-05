import { TestBed } from '@angular/core/testing';

import { TestDriveService } from './test-drive.service';

describe('TestDriveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestDriveService = TestBed.get(TestDriveService);
    expect(service).toBeTruthy();
  });
});
