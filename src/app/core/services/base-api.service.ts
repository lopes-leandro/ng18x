import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiContract } from '@core/contracts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService implements ApiContract {

  protected http = inject(HttpClient);
  
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${endpoint}`);
  }
  
  post<T>(endpoint: string, payload: T): Observable<T> {
    return this.http.post<T>(`${endpoint}`, payload);
  }
  
  put<T>(endpoint: string, payload: T): Observable<T> {
    return this.http.put<T>(`${endpoint}`, payload);
  }
  
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${endpoint}`);
  }
}
