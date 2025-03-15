import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDataService } from '@core/domain/services';
import { Step1FormComponent } from './components/step1-form/step1-form.component';
import { Step2FormComponent } from './components/step2-form/step2-form.component';
import { Step3FormComponent } from './components/step3-form/step3-form.component';

@Component({
  selector: 'cx18-multi-step-form',
  standalone: true,
  imports: [ReactiveFormsModule, Step1FormComponent, Step2FormComponent, Step3FormComponent],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss'
})
export class MultiStepFormComponent {

  private readonly formDataService = inject(FormDataService);

  steps = ['Informações Básicas', 'Detalhes Adicionais', 'Confirmação'];

  get currentStep(): number {
    return this.formDataService.getCurrentStep();
  }

  nextStep(): void {
    this.formDataService.goToNextStep();
  }

  previousStep(): void {
    this.formDataService.goToPreviousStep();
  }

  submitForm(): void {
    const formData = this.formDataService.getCompleteFormData();
    console.log('Form submitted:', formData);
    // Aqui deve ser enviado os dados para o backend.
    alert('Formulário enviado com sucesso!');
    this.formDataService.resetForm();
  }

}
