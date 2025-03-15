import { inject, Injectable } from '@angular/core';
import { ApiContract } from '@core/contracts';
import { API_SERVICE_TOKEN } from '@core/tokens';
import { OccupationDto } from '@domain/dtos';
import { OccupationMapper } from '@domain/mappers';
import { Occupation } from '@domain/models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OccupationService {

  private apiService = inject(API_SERVICE_TOKEN) as ApiContract;
  
  private endpoint = {
    assets: 'assets/data/occupation.json'
  }

  list(): Observable<Occupation[]> {
    return this.apiService.get<OccupationDto[]>(this.endpoint.assets).pipe(
      map(dto => dto.map(m => OccupationMapper.fromDto(m)))
    )
  }
}
