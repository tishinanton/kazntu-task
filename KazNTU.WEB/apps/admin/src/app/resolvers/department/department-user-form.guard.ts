import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApplicationContext, Department, OdataResponse } from '@kazntu/backend';

@Injectable()
export class DepartmentUserFormGuard implements Resolve<OdataResponse<Department>> {

    constructor(private context: ApplicationContext) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        try {
            return await this.context.departments.get().toPromise();
        } catch {
            return null;
        }
    }
}
