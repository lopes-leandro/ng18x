import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDataService } from '@core/domain/services';

@Component({
  selector: 'cx18-step3-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step3-form.component.html',
  styleUrl: './step3-form.component.scss'
})
export class Step3FormComponent implements OnInit{

  private readonly fb = inject(FormBuilder);
  private readonly formDataService = inject(FormDataService);

  form!: FormGroup;

  get field1() {
    return this.form.get('field1') as FormControl;
  }

  get field2() {
    return this.form.get('field2') as FormControl;
  }

  get field3() {
    return this.form.get('field3') as FormControl;
  }

  get step1Data() {
    return this.formDataService.getStep1Data();
  }

  get step2Data() {
    return this.formDataService.getStep2Data();
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    // Pega os dados do stored, se existir;
    const storedData = this.formDataService.getStep3Data();

    // Cria o formulário
    this.form = this.fb.group({
      field1: [storedData.field1, Validators.required],
      field2: [storedData.field2, Validators.required],
      field3: [storedData.field3, Validators.required]
    });

    // Salva automáticamente a cada alteração no formulário.
    this.form.valueChanges.subscribe(value => {
      this.saveFormData();
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.saveFormData();
      // Passo final - a ação de envio pe manipulada pelo o componente container.
    } else {
      // Mantem todos os campos tocados para disparar as mensagens de validação.
      this.form.markAllAsTouched();
    }
  }

  private saveFormData(): void {
    if (this.form.valid) {
      this.formDataService.updateStep3(this.form.value);
    }
  }

}
