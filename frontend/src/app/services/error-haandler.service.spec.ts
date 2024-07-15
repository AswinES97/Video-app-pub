import { TestBed } from '@angular/core/testing';

import { ErrorHaandlerService } from './error-haandler.service';

describe('ErrorHaandlerService', () => {
  let service: ErrorHaandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHaandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
