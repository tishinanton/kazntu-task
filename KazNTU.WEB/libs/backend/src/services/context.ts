import { Injectable, Inject } from "@angular/core";
import { UsersDbSet } from "./users";
import { PositionsDbSet } from "./positions";
import { DepartmentsDbSet } from "./departments";
import { API_URL } from "./../models/tokens";

@Injectable()
export class ApplicationContext {
    constructor(
        @Inject(API_URL) public apiUrl: string,
        public users: UsersDbSet,
        public positions: PositionsDbSet,
        public departments: DepartmentsDbSet
    ) { }
}