import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectCodeService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    private _api: string = environment.BACKEND_HOST;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any>
    {
        return this._httpClient.get('api/dashboards/project').pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }

    getNecessaryInfo(): Observable<any> {
        return this._httpClient.get(this._api + '/api/dashboards/getNecessaryInfo').pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }
    addNewProjectCode(projectCode: { activities: number; dependency: number; headquarter: number, orderNumber: String, year:number, creationDate: Date }): Observable<any> {
        return this._httpClient.post(this._api + '/api/dashboards/addNewProjectCode', projectCode).pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }
}
