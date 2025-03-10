import { inject, Injectable } from '@angular/core';
import { Nacionalidade, Occupation } from '@domain/models';
import { NacionalidadesService } from '@domain/services';
import { OccupationService } from '@domain/services/occupation.service';
import { forkJoin, Observable } from 'rxjs';


export interface BasicData {
  nationalities$: Nacionalidade[];
  occupations$: Occupation[];
}

@Injectable({
  providedIn: 'root'
})
export class ContractFacadeService {

  private nationalitiesService = inject(NacionalidadesService);
  private occupationsService = inject(OccupationService);

  getBasicDataLoad(): Observable<BasicData> {
    return forkJoin({
      nationalities$: this.nationalitiesService.list(),
      occupations$: this.occupationsService.list()
    })
  }

}
