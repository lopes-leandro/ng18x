import { TestBed } from '@angular/core/testing';

import { StorageFactoryService } from './storage-factory.service';

describe('StorageFactoryService', () => {
  let service: StorageFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
