export interface EntityConstructor<TEntity> {
    new(...parts: Partial<TEntity>[]): TEntity;
}