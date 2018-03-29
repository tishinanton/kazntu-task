import { DbSet } from "./db-set";
import { Injectable, Injector } from "@angular/core";
import { User } from "./../models/user";

@Injectable()
export class UsersDbSet extends DbSet<User> {
    constructor(injector: Injector) {
        super('Users', User, injector);
    }
}