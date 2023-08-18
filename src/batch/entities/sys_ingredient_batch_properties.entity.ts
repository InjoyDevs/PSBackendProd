import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
/**
 * @description Batch Schema
 */

@Entity('sys_ingredient_batch_properties')
export class SysIngrdientBatchProperties {
  @PrimaryGeneratedColumn('increment') batchId: number;
  @Column({
    nullable: false,
  })
  deviceId: number;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @Column({
    nullable: true,
    type: Number,
  })
  mappedBatch: number;

  @Column({
    nullable: true,
    default: false,
    type: Boolean,
  })
  isNewBatch: boolean;
}
