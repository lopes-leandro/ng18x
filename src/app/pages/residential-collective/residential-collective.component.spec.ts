import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialCollectiveComponent } from './residential-collective.component';

describe('ResidentialCollectiveComponent', () => {
  let component: ResidentialCollectiveComponent;
  let fixture: ComponentFixture<ResidentialCollectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResidentialCollectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentialCollectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
