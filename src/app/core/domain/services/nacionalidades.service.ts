import { inject, Injectable } from '@angular/core';
import { ApiContract } from '@core/contracts';
import { API_SERVICE_TOKEN } from '@core/tokens';
import { map, Observable } from 'rxjs';

import { Nacionalidade } from '@domain/models';
import { NacionalidadeDto } from '@domain/dtos';
import { NacionalidadeMapper } from '@domain/mappers';


@Injectable({
  providedIn: 'root'
})
export class NacionalidadesService {

  private apiService = inject(API_SERVICE_TOKEN) as ApiContract;
  private endpoint = {
    read: 'assets/data/nationality.json'
  }

  list(): Observable<Nacionalidade[]> {
    return this.apiService.get<NacionalidadeDto[]>(this.endpoint.read).pipe(
      map(dto => dto.map(m => NacionalidadeMapper.fromDto(m)))
    );
  }
}
