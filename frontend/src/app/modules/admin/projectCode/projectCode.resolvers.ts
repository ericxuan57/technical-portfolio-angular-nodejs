import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectCodeService } from '../../../core/services/projectCode.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectCodeResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _projectCodeService: ProjectCodeService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._projectCodeService.getData();
    }
}
