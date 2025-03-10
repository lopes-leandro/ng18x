import { TestBed } from '@angular/core/testing';

import { ContractFacadeService } from './contract-facade.service';

describe('ContractFacadeService', () => {
  let service: ContractFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
