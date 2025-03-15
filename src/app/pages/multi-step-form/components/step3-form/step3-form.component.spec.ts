import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3FormComponent } from './step3-form.component';
import { FormDataService } from '@core/domain/services';
import { Step1Model, Step2Model, Step3Model } from '@core/domain/models';
import { ReactiveFormsModule } from '@angular/forms';

describe('Step3FormComponent', () => {
  let component: Step3FormComponent;
  let fixture: ComponentFixture<Step3FormComponent>;
  let formDataServiceSpy: jasmine.SpyObj<FormDataService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('FormDataService', [
      'getStep1Data',
      'getStep2Data',
      'getStep3Data',
      'updateStep3'
    ]);

    const mockStep1Data: Step1Model = {
      field1: 'step1-field1',
      field2: 'step1-field2',
      subArray1: [{
        field1: 'sub1-field1',
        field2: 'sub1-field2',
        field3: 'sub1-field3',
        field4: 'sub1-field4',
        field5: 'sub1-field5',
      }],
      subArray2: [{
        field1: 'sub2-field1',
        field2: 'sub2-field2',
        field3: 'sub2-field3',
        field4: 'sub2-field4',
        field5: 'sub2-field5',
      }]
    };

    const mockStep2Data: Step2Model = {
      field1: 'step2-field1',
      field2: 'step2-field2',
      field3: 'step2-field3',
    };

    const mockStep3Data: Step3Model = {
      field1: 'step3-field1',
      field2: 'step3-field2',
      field3: 'step3-field3',
    };

    spy.getStep1Data.and.returnValue(mockStep1Data);
    spy.getStep2Data.and.returnValue(mockStep2Data);
    spy.getStep3Data.and.returnValue(mockStep3Data);


    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, Step3FormComponent],
      providers: [
        { provide: FormDataService, useValue: spy }
      ]
    }).compileComponents();

    formDataServiceSpy = TestBed.inject(FormDataService) as jasmine.SpyObj<FormDataService>;
    fixture = TestBed.createComponent(Step3FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud initialize the form with stored data', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('field1')).toBeDefined();
    expect(component.form.get('field2')).toBeDefined();
    expect(component.form.get('field3')).toBeDefined();

    expect(formDataServiceSpy.getStep3Data).toHaveBeenCalled();

    expect(component.field1.value).toBe('step3-field1');
    expect(component.field2.value).toBe('step3-field2');
    expect(component.field3.value).toBe('step3-field3');

  });

  it('should access step1 and step2 data form summary display', () => {
    expect(component.step1Data).toBeDefined();
    expect(component.step2Data).toBeDefined();

    expect(formDataServiceSpy.getStep1Data).toHaveBeenCalled();
    expect(formDataServiceSpy.getStep2Data).toHaveBeenCalled();

    expect(component.step1Data.field1).toBe('step1-field1');
    expect(component.step2Data.field1).toBe('step2-field1');
  });

  it('should save data on form changes', () => {
    component.form.patchValue({
      field1: 'updated-field1',
      field2: 'updated-field2',
      field3: 'updated-field3'
    });

    fixture.detectChanges();

    expect(formDataServiceSpy.updateStep3).toHaveBeenCalled();
  });

  it('should validate the form before submission', () => {
    expect(component.form.valid).toBeTrue();

    // Mantem o formulário inválido para testes
    component.form.patchValue({
      field1: '',
      field2: '',
      field3: ''
    });

    expect(component.form.valid).toBeFalse();

    // Dispara o envido do formulário
    component.onSubmit();

    // Formulário deve ser marcado como tocado para validação
    expect(component.field1.touched).toBeTrue();
    expect(component.field2.touched).toBeTrue();
    expect(component.field3.touched).toBeTrue();

    // Mantem o fomulário válido novamente e envie
    component.form.patchValue({
      field1: 'valid-field1',
      field2: 'valid-field2',
      field3: 'valid-field3'
    });

    expect(component.form.valid).toBeTrue();

    component.onSubmit();
    expect(formDataServiceSpy.updateStep3).toHaveBeenCalled();

  });
});
