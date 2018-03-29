import { Injector, Injectable } from "@angular/core";
import { API_URL } from "./../models/tokens";
import { HttpClient, HttpParams } from '@angular/common/http';
import { OdataResponse, EntityConstructor } from "./../models";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DbSet<TEntity, TKey = string> {
    protected apiUrl = this.injector.get<string>(API_URL);
    protected http = this.injector.get(HttpClient);

    constructor(
        protected entityPath: string,
        protected constructor: EntityConstructor<TEntity>,
        protected injector: Injector
    ) { }

    public get(): Observable<OdataResponse<TEntity>>;
    public get(key: TKey): Observable<TEntity>;
    public get(key: TKey, params: HttpParams): Observable<TEntity>;
    public get(params: HttpParams): Observable<OdataResponse<TEntity>>;
    public get(key: TKey | HttpParams = null, params: HttpParams = new HttpParams()) {
        if (key instanceof HttpParams) {
            return this.getAll(key);
        } else if (key == null) {
            return this.getAll(params);
        } else {
            return this.getSingle(key, params);
        }
    }

    private getAll(params: HttpParams) {
        return this.http.get<OdataResponse<TEntity>>(`${this.apiUrl}/odata/${this.entityPath}`, {
            params
        }).pipe(
            map(r => new OdataResponse<TEntity>(this.constructor, r))
        );
    }

    private getSingle(key: TKey, params: HttpParams) {
        return this.http.get<TEntity>(`${this.apiUrl}/odata/${this.entityPath}(${key})`, {
            params
        }).pipe(
            map(r => new this.constructor(r))
        );
    }

    public post(model: TEntity, params: HttpParams = new HttpParams) {
        return this.http.post<TEntity>(`${this.apiUrl}/odata/${this.entityPath}`, model, {
            params
        }).pipe(
            map(r => new this.constructor(r))
        );
    }

    public put(key: TKey, model: TEntity, params: HttpParams = new HttpParams) {
        return this.http.put<TEntity>(`${this.apiUrl}/odata/${this.entityPath}(${key})`, model, {
            params
        }).pipe(
            map(r => new this.constructor(r))
        );
    }

    public patch(key: TKey, model: Partial<TEntity>, params: HttpParams = new HttpParams) {
        return this.http.patch<TEntity>(`${this.apiUrl}/odata/${this.entityPath}(${key})`, model, {
            params
        }).pipe(
            map(r => new this.constructor(r))
        );
    }

    public delete(key: TKey, params: HttpParams = new HttpParams) {
        return this.http.delete<never>(`${this.apiUrl}/odata/${this.entityPath}(${key})`, {
            params
        });
    }
}