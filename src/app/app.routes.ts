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
    }
];
