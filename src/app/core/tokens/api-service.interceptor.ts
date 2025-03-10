import { InjectionToken } from '@angular/core';
import { ApiService } from '@core/contracts/api-service';

export const API_SERVICE_TOKEN = new InjectionToken<ApiService>('API_SERVICE_TOKEN');
