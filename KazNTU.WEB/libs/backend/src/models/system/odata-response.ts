import { EntityConstructor } from './entity-constructor';

export class OdataResponse<TEntity> {
    '@odata.context': string;
    value: TEntity[];

    constructor(constructor: EntityConstructor<TEntity>, ...parts: Partial<OdataResponse<TEntity>>[]) {
        Object.assign(this, ...parts);
        if (this.value) {
            this.value = this.value.map(i => new constructor(i));
        }
    }
}