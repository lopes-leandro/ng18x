import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDataService } from '@core/domain/services';

@Component({
  selector: 'cx18-step2-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step2-form.component.html',
  styleUrl: './step2-form.component.scss'
})
export class Step2FormComponent implements OnInit {

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

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {

    // Pega dados do store, se tiver;
    const storedData = this.formDataService.getStep2Data();

    // Cria o formulário
    this.form = this.fb.group({
      field1: [storedData.field1, Validators.required],
      field2: [storedData.field2, Validators.required],
      field3: [storedData.field3, Validators.required]
    });

    // Salvamento automático na alteração do formulário
    this.form.valueChanges.subscribe(value => {
      this.saveFormData();
    });

  }

  onSubmit(): void {
    if (this.form.valid) {
      this.saveFormData();
      this.formDataService.goToNextStep();
    } else {
      // Marca todos os campos como tocados e dispara as mensagens de validação.
      this.form.markAllAsTouched();
    }
  }

  private saveFormData(): void {
    if (this.form.valid) {
      this.formDataService.updateStep2(this.form.value);
    }
  }
}
