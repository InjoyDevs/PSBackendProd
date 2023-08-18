export abstract class BatchRepositoryInterface {
    abstract addBatch();
    abstract updateBatch();
    abstract findOneByBatchId();
    abstract findOneOrFailByBatchId();
    abstract findManyByDeviceId();
    abstract findManyOrFailByDeviceId();
    abstract findOneByCustomParameters();
    abstract findOneOrFailByCustomParameters();
    abstract findManyByCustomParameters();
    abstract findManyOrFailByCustomParameters();
    abstract softDeleteByBatchId();
}