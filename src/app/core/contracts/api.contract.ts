import { Observable } from "rxjs";

export interface ApiContract {
    get<T>(endpoint: string): Observable<T>;
    post<T>(endpoint: string, payload: T): Observable<T>;
    put<T>(endpoint: string, payload: T): Observable<T>;
    delete<T>(endpoint:string): Observable<T>;
}
