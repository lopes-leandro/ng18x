import { inject, Injectable, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormDataDTO } from '@core/domain/dtos';
import { StepMapper } from '@core/domain/mappers';
import { FormDataModel } from '@core/domain/models';
import { StorageFactoryService, StorageType } from '@core/storages/services/storage-factory.service';

@Injectable({
  providedIn: 'root'
})
export class FormStateService {

  private readonly STORAGE_KEY = 'multiStepFormData';
  private readonly storageFactory = inject(StorageFactoryService);
  private readonly storage = this.storageFactory.getStorage(StorageType.LOCAL);


  private readonly initialState: FormDataModel = {
    step1: {
      field1: '',
      field2: '',
      subArray1: [],
      subArray2: []
    },
    step2: {
      field1: '',
      field2: '',
      field3: ''
    },
    step3: {
      field1: '',
      field2: '',
      field3: ''
    },
    currentStep: 1
  };

  private readonly formState = signal<FormDataModel>(this.loadFromStorage() || this.initialState);
  
  constructor() {
    this.loadFromStorage();
  }

  getFormState(): FormDataModel {
    return this.formState();
  }

  getCurrentStep(): number {
    return this.formState().currentStep;
  }

  getStep1Data() {
    return this.formState().step1;
  }

  getStep2Data() {
    return this.formState().step2;
  }

  getStep3Data() {
    return this.formState().step3;
  }

  updateStep1(data: Partial<FormDataModel['step1']>): void {
    this.formState.update(state => {
      const newState = {
        ...state,
        step1: {
          ...state.step1,
          ...data
        }
      };
      console.warn('FormState newState:', newState);
      
      this.saveToStorage(newState);
      return newState;
    });
  }

  updateStep2(data: Partial<FormDataModel['step2']>): void {
    this.formState.update(state => {
      const newState = {
        ...state,
        step2: {
          ...state.step2,
          ...data
        }
      };
      this.saveToStorage(newState);
      return newState;
    });
  }

  updateStep3(data: Partial<FormDataModel['step3']>): void {
    this.formState.update(state => {
      const newState = {
        ...state,
        step3: {
          ...state.step3,
          ...data
        }
      };
      this.saveToStorage(newState);
      return newState;
    });
  }

  goToNextStep(): void {
    if (this.formState().currentStep < 3) {
      this.formState.update(state => {
        const newState = {
          ...state,
          currentStep: state.currentStep + 1
        };
        this.saveToStorage(newState);
        return newState;
      });
    }
  }

  goToPreviousStep(): void {
    if (this.formState().currentStep > 1) {
      this.formState.update(state => {
        const newState = {
          ...state,
          currentStep: state.currentStep - 1
        };
        this.saveToStorage(newState);
        return newState;
      });
    }
  }

  goToStep(step: number): void {
    if (step >= 1 && step <=3) {
      this.formState.update(state => {
        const newState = {
          ...state,
          currentState: step
        };
        this.saveToStorage(newState);
        return newState;
      });
    }
  }

  resetForm(): void {
    this.formState.set(this.initialState);
    this.storage.removeItem(this.STORAGE_KEY);
  }

  private saveToStorage(state: FormDataModel) {
    const dto = StepMapper.toDTO(state);
    this.storage.setItem(this.STORAGE_KEY, dto);
  }

  
  private  loadFromStorage(): FormDataModel | null {
    const storedData = this.storage.getItem<FormDataDTO>(this.STORAGE_KEY);
    if (storedData) {
      return StepMapper.toModel(storedData);
    }
    return null;
  }

}


