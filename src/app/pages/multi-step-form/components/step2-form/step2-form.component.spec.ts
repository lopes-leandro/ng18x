import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2FormComponent } from './step2-form.component';
import { FormDataService } from '@core/domain/services';
import { Step2Model } from '@core/domain/models';
import { ReactiveFormsModule } from '@angular/forms';

describe('Step2FormComponent', () => {
  let component: Step2FormComponent;
  let fixture: ComponentFixture<Step2FormComponent>;
  let formDataServiceSpy: jasmine.SpyObj<FormDataService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('FormDataService', [
      'getStep2Data',
      'updateStep2',
      'goToNextStep'
    ]);

    // Mock o dado inicial
    const mockStep2Data: Step2Model = {
      field1: '',
      field2: '',
      field3: ''
    };

    spy.getStep2Data.and.returnValue(mockStep2Data);
    
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        Step2FormComponent],
        providers: [
          {provide: FormDataService, useValue: spy}
        ]
    })
    .compileComponents();

    formDataServiceSpy = TestBed.inject(FormDataService) as jasmine.SpyObj<FormDataService>;
    fixture = TestBed.createComponent(Step2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with stored data', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('field1')).toBeDefined();
    expect(component.form.get('field2')).toBeDefined();
    expect(component.form.get('field3')).toBeDefined();

    expect(formDataServiceSpy.getStep2Data).toHaveBeenCalled();
  });

  it('should save data on form changes', () => {
    component.form.patchValue({
      field1: 'test1',
      field2: 'test2',
      field3: 'test3'
    });

    fixture.detectChanges();

    expect(formDataServiceSpy.updateStep2).toHaveBeenCalled();
  });

  it('should validade the form before submission', () => {

    // Formulário é inicializado invalido
    expect(component.form.valid).toBeFalse();

    // Envia o formulário inválido
    component.onSubmit();
    expect(formDataServiceSpy.goToNextStep).not.toHaveBeenCalled();

    // Preenche outro formulário
    component.form.patchValue({
      field1: 'test1',
      field2: 'test2',
      field3: 'test3',
    });

    // Agora o formulário deve ser válido
    expect(component.form.valid).toBeTrue();

    // Envia o formulário válido
    component.onSubmit();
    expect(formDataServiceSpy.goToNextStep).toHaveBeenCalled();
  });
});
