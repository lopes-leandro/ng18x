import { InjectionToken } from '@angular/core';
import { ApiContract } from '@core/contracts/api.contract';

export const API_SERVICE_TOKEN = new InjectionToken<ApiContract>('API_SERVICE_TOKEN');
