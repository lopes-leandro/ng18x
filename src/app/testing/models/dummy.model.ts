import { ApolicyDto } from "@core/models";

export const fakeApolicy: ApolicyDto = { poliza: 1, apolice: '098097807SBF09809809', nombre: 'A', data_inicio: '20250606', data_fim: '20260606' };

export const fakePolicies: ApolicyDto[] = [
    { poliza: 1, apolice: '098097807SBF09809809', nombre: 'A', data_inicio: '20250616', data_fim: '20260616' }, 
    { poliza: 2, apolice: '098097807SSS09809809', nombre: 'B', data_inicio: '20250620', data_fim: '20260620' }
]
