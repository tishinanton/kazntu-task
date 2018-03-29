import { DbSet } from "./db-set";
import { Injectable, Injector } from "@angular/core";
import { Position } from "./../models/position";

@Injectable()
export class PositionsDbSet extends DbSet<Position> {
    constructor(injector: Injector) {
        super('Positions', Position, injector);
    }
}