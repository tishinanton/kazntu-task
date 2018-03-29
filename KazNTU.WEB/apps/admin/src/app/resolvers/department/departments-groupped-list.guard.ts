import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OdataResponse, Department, ApplicationContext } from '@kazntu/backend';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DepartmentsGrouppedListGuard implements Resolve<OdataResponse<Department>> {

    constructor(private context: ApplicationContext) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        try {
            return await this.context.departments.get(new HttpParams().set('$expand', 'Users($expand=Position)')).toPromise();
        } catch {
            return null;
        }
    }
}
