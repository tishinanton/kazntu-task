import { DbSet } from "./db-set";
import { Injectable, Injector } from "@angular/core";
import { Department } from "./../models/department";

@Injectable()
export class DepartmentsDbSet extends DbSet<Department> {
    constructor(injector: Injector) {
        super('Departments', Department, injector);
    }
}