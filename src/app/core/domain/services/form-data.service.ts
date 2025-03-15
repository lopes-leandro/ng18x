import { inject, Injectable } from '@angular/core';
import { FormStateService } from '@core/state/form-state.service';
import { FormDataModel, Step1Model, Step2Model, Step3Model } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private readonly formStateService = inject(FormStateService);

  getStep1Data(): Step1Model {
    return this.formStateService.getStep1Data();
  }

  updateStep1(data: Partial<Step1Model>): void {
    this.formStateService.updateStep1(data);
    console.warn('Step1 data: ', data);
  }

  getStep2Data(): Step2Model {
    return this.formStateService.getStep2Data();
  }

  updateStep2(data: Partial<Step2Model>): void {
    this.formStateService.updateStep2(data);
  }

  getStep3Data(): Step3Model {
    return this.formStateService.getStep3Data();
  }

  updateStep3(data: Partial<Step3Model>): void {
    this.formStateService.updateStep3(data);    
  }

  getCurrentStep(): number {
    return this.formStateService.getCurrentStep();
  }

  goToNextStep(): void {
    this.formStateService.goToNextStep();
  }

  goToPreviousStep(): void {
    this.formStateService.goToPreviousStep();
  }

  goToStep(step: number): void {
    this.formStateService.goToStep(step);
  }

  getCompleteFormData(): FormDataModel {
    return this.formStateService.getFormState();
  }

  resetForm(): void {
    this.formStateService.resetForm();
  }

  isStep1Valid(data: Step1Model): boolean {
    return !!data.field1 &&
      !!data.field2 &&
      data.subArray1.every(item => !!item.field1 && !!item.field2 && !!item.field3 && !!item.field4 && !!item.field5) &&
      data.subArray2.every(item => !!item.field1 && !!item.field2 && !!item.field3 && !!item.field4 && !!item.field5)
  }

  isStep2Valid(data: Step2Model): boolean {
    return !!data.field1 && !!data.field2 && !!data.field3;
  }

  isStep3Valid(data: Step3Model): boolean {
    return !!data.field1 && !!data.field2 && !!data.field3;
  }

  canProceedToStep(step: number): boolean {
    const currentStep = this.getCurrentStep();

    if (step < currentStep) {
      return true;
    }

    if (step > currentStep + 1) {
      return false;
    }

    if (step === currentStep + 1) {
      switch (currentStep) {
        case 1:
          return this.isStep1Valid(this.getStep1Data());
        case 2:
          return this.isStep2Valid(this.getStep2Data());
        default:
          return false;
      }
    }

    return false;
  }

}
