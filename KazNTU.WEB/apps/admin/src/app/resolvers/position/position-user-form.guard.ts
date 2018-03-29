import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApplicationContext, Department, OdataResponse, Position } from '@kazntu/backend';

@Injectable()
export class PositionUserFormGuard implements Resolve<OdataResponse<Position>> {

    constructor(private context: ApplicationContext) { }

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        try {
            return await this.context.positions.get().toPromise();
        } catch {
            return null;
        }
    }
}
