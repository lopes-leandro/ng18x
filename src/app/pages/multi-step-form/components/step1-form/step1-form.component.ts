import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubArray1Item, SubArray2Item } from '@core/domain/models';
import { FormDataService } from '@core/domain/services';

@Component({
  selector: 'cx18-step1-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step1-form.component.html',
  styleUrl: './step1-form.component.scss'
})
export class Step1FormComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly formDataService = inject(FormDataService);

  form!: FormGroup;

  get field1() {
    return this.form.get('field1') as FormControl;
  }
  get field2() {
    return this.form.get('field2') as FormControl;
  }
  get subArray1Items() {
    return this.form.get('subArray1') as FormArray;
  }

  get subArray2Items() {
    return this.form.get('subArray2') as FormArray;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {

    // Pega o stored data, if existir
    const storedData = this.formDataService.getStep1Data();

    // Cria o formulário
    this.form = this.fb.group({
      field1: [storedData.field1, Validators.required],
      field2: [storedData.field2, Validators.required],
      subArray1: this.fb.array([]),
      subArray2: this.fb.array([])
    });

    // Adiciona os itens do subArray1 existente se existir
    if (storedData.subArray1 && storedData.subArray1.length > 0) {
      storedData.subArray1.forEach(item => this.addSubArray1Item(item));
    } 

    // Salvamento automático na alteração do formulário
    this.form.valueChanges.subscribe(value => {
      this.saveFormData();
    })

  }

  // Trata o SubArray1
  addSubArray1Item(item?: SubArray1Item): void {
    const subArray1Item = this.fb.group({
      field1: [item?.field1 || '', Validators.required],
      field2: [item?.field2 || '', Validators.required],
      field3: [item?.field3 || '', Validators.required],
      field4: [item?.field4 || '', Validators.required],
      field5: [item?.field5 || '', Validators.required],
    });

    this.subArray1Items.push(subArray1Item);
  }

  removeSubArray1Item(index: number): void {
    this.subArray1Items.removeAt(index);
  }

  // Trata o SubArray2
  addSubArray2Item(item?: SubArray2Item): void {
    const subArray2Item = this.fb.group({
      field1: [item?.field1 || '', Validators.required],
      field2: [item?.field2 || '', Validators.required],
      field3: [item?.field3 || '', Validators.required],
      field4: [item?.field4 || '', Validators.required],
      field5: [item?.field5 || '', Validators.required],
    });

    this.subArray2Items.push(subArray2Item);
  }

  removeSubArray2Item(index: number): void {
    this.subArray2Items.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.saveFormData();
      this.formDataService.goToNextStep();
    } else {
      // Matenho todos os campos tocados para disparar as menssagens de validação
      this.form.markAllAsTouched();
    }
  }

  saveFormData(): void {
    if (this.form.valid) {
      this.formDataService.updateStep1(this.form.value)
    }
    console.error('Formulário válido:', this.form.valid);    
    console.error('Formulário:', this.form.value);   
  }



}
