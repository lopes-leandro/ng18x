import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicContractDataComponent } from './basic-contract-data.component';

describe('BasicContractDataComponent', () => {
  let component: BasicContractDataComponent;
  let fixture: ComponentFixture<BasicContractDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicContractDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicContractDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
