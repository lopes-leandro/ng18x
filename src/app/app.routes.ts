import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/contrato',
        pathMatch: 'full'
    },
    {
        path: 'contrato',
        loadComponent: () => import('./pages/contract/contract.page').then(p => p.ContractPage)
    },
    {
        path: 'contrato-ex',
        loadComponent: () => import('./pages/multi-step-form/multi-step-form.component').then(p => p.MultiStepFormComponent)
    }

];
