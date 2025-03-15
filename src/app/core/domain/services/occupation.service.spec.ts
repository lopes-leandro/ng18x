import { TestBed } from '@angular/core/testing';

import { OccupationService } from './occupation.service';

describe('OccupationService', () => {
  let service: OccupationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupationService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
