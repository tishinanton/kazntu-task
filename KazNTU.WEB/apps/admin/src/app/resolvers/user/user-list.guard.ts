import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User, ApplicationContext, OdataResponse } from '@kazntu/backend';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UserListGuard implements Resolve<OdataResponse<User>> {

    constructor(private context: ApplicationContext) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        try {
            return await this.context.users.get(new HttpParams().set('$expand', 'Position,Department')).toPromise();
        } catch {
            return null;
        }
    }
}
