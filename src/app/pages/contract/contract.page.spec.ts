import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPage } from './contract.page';

xdescribe('ContractPage', () => {
  let component: ContractPage;
  let fixture: ComponentFixture<ContractPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
