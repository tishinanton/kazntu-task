import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User, ApplicationContext } from '@kazntu/backend';

@Injectable()
export class UserFormGuard implements Resolve<User> {

    constructor(private context: ApplicationContext) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.paramMap.has('id')) {
            try {
                return await this.context.users.get(route.paramMap.get('id')).toPromise();
            } catch {
                return null;
            }
        } else {
            return null;
        }
    }
}
