import { Component, inject, OnInit } from '@angular/core';
import { Nacionalidade } from '@domain/models';
import { Observable } from 'rxjs';
import { BasicData, ContractFacadeService } from './facades/contract-facade.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'cx18-contract',
  standalone: true,
  imports: [AsyncPipe, NgIf, ReactiveFormsModule],
  templateUrl: './contract.page.html',
  styleUrl: './contract.page.scss'
})
export class ContractPage implements OnInit{
  
  private contractFacade = inject(ContractFacadeService);
  private fb = inject(FormBuilder);
  basicForm!: FormGroup;
  
  basicData$!: Observable<BasicData>;
  
  ngOnInit(): void {
    this.loadData();
    this.loadForms();
  }

  private loadData() {
    this.basicData$ = this.contractFacade.getBasicDataLoad();
  }

  private loadForms() {
    this.basicForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      occupation: ['', Validators.required],
      nationaly: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.basicForm.valid) {
      console.log('Form submitted: ', this.basicForm.value);
      
    }
  }
}
