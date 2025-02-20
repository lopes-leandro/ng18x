import { Injectable } from '@angular/core';
import { ApolicyDTO, ApolicyViewModel } from '@core/models';
import BaseRepository from '@core/repositories/base.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApolicyService extends BaseRepository<ApolicyDTO, ApolicyViewModel> {
  
  protected override get endpoint(): string {
    throw new Error('Method not implemented.');
  }
  protected override get mapToView(): (dto: ApolicyDTO) => ApolicyViewModel {
    throw new Error('Method not implemented.');
  }
  protected override get mapToApi(): (model: ApolicyViewModel) => ApolicyDTO {
    throw new Error('Method not implemented.');
  }
  

  
}
