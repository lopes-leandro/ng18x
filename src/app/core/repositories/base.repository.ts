import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

export default abstract class BaseRepository<T, V> {

    protected baseUrl = environment.apiUrl;
    protected http = inject(HttpClient);

    /**
     * Cada serviço concreto deve definir sou endpoint.
     */
    protected abstract get defaultEndpoint(): string;

    /**
     * Endpoints específicos para cada operação.
     * Por padrão, será retornado o defaultEndpoint, mas podem ser sobrescritos.
     */
    protected get createEndpoint(): string {
        return this.defaultEndpoint;
    }

    protected get readEndpoint(): string {
        return this.defaultEndpoint;
    }

    protected get readAllEndpoint(): string {
        return this.defaultEndpoint;
    }

    protected get updateEndpoint(): string {
        return this.defaultEndpoint;
    }

    protected get deleteEndpoint(): string {
        return this.defaultEndpoint;
    }


    /**
     * Permite que a URL do endpoint seja alterado, se necessário.
     * 
     * @returns retorna o novo endereço do endpoint.
     */
    protected buildUrl(endpoint: string): string {
        return `${this.baseUrl}/${endpoint}`;
    }

    /**
     * Função que mapeia os dados recebidos da API (tipo T) para a View (tipo V).
     */
    protected abstract get mapperApiToView(): (dto: T) => V;

    /**
     * Funcão que mapeia os dados da View (tipo V) para a API (tipo T).
     */
    protected abstract get mappperViewToApi(): (model: V) => T;

    /**
     * Converte os dados da API (tipo T) para o View Model (tipo V).
     * 
     * @param dto Objeto que será convertido da API (tipo T)
     * @returns Retorna o objeto View (tipo V)
     */
    protected fromToView(dto: T): V {
        return this.mapperApiToView(dto);
    }

    /**
     * Converte os dados da View Model (tipo V) para a API (tipo T).
     * 
     * @param model 
     * @returns 
     */
    protected fromToApi(model: V): T {
        return this.mappperViewToApi(model);
    }

    /**
     * Método que retorna todos os registros,
     * convertendo cada objeto retornado da API (tipo T) para a View Model (tipo V).
     * 
     * @param endpoint endereço da api.
     * @returns Retorna um array View Model (tipo V).
     */
    protected getAll(params?: HttpParams, headers?: HttpHeaders): Observable<V[]> {
        return this.http.get<T[]>(`${this.buildUrl(this.readAllEndpoint)}`, {params, headers}).pipe(
            map(dto => dto.map(this.fromToView.bind(this)))
        );
    }

    /**
     * Método que retorna um registro (por id),
     * convertendo cada objeto retornado da API (tipo T) para a View Model (tipo V).
     * 
     * @param id Id que será pesquisado.
     * @param params Demais parâmetros.
     * @param headers Parâmetros que devem ser informados no cabeçalho HTTP.
     * @returns Retorna um objeto View Model (tipo V).
     */
    protected getById(id: string | number, params?: HttpParams, headers?: HttpHeaders): Observable<V> {
        return this.http.get<T>(`${this.buildUrl(this.readEndpoint)}/${id}`, {params, headers}).pipe(
            map(this.fromToView.bind(this))
        );
    }


    /**
     * Método que cria um novo registro.
     * 
     * @param item Registro que será inserido.
     * @param params Parâmetros do http.
     * @param headers Variáveis do cabeçalho http.
     * @returns Retorna o item criado
     */
    protected create(item: V, params?: HttpParams, headers?: HttpHeaders): Observable<V> {
        const payload: T = this.fromToApi(item);
        return this.http.post<T>(`${this.buildUrl(this.createEndpoint)}`, payload, {params, headers}).pipe(
            map(this.fromToView.bind(this))
        );
    }

    /**
     * Método que retorna um registro atualizado.
     * 
     * @param id Id do registro que será atualizado.
     * @param item Registro quer será atualizado.
     * @param params Query parameters opcionais para requisição HTTP.
     * @param headers Configurações opcionais para o cabeçalho da requisição HTTP.
     * @returns Retorna o registro atualizado.
     */
    protected update(id: number | string, item: V, params?: HttpParams, headers?: HttpHeaders): Observable<V> {
        const payload: T = this.fromToApi(item);
        return this.http.put<T>(`${this.buildUrl(this.updateEndpoint)}/${id}`, payload, {params, headers}).pipe(
            map(this.fromToView.bind(this))
        );
    }


    /**
     * Método que remove um registro.
     * 
     * @param id Id do registro que será removido.
     * @param params Query parameters opcionais para requisição HTTP.
     * @param headers Configurações opcionais para o cabeçalho da requisição HTTP.
     * @returns Retorna o registro atualizado.
     */
    protected delete(id: number | string, params?: HttpParams, headers?: HttpHeaders): Observable<void> {
        return this.http.delete<void>(`${this.buildUrl(this.deleteEndpoint)}/${id}`, {params, headers})
    };
}
