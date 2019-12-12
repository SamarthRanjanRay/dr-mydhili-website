import { TestBed } from '@angular/core/testing';

import { BackEndServiceService } from './back-end-service.service';

describe('BackEndServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackEndServiceService = TestBed.get(BackEndServiceService);
    expect(service).toBeTruthy();
  });
});
