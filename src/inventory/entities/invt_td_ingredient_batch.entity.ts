import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('invt_td_ingredient_batch')
export class InvtTdIngredientBatch {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  batch_id: string;

  @Column({ type: 'int' })
  ingredient_id!: number;

  @Column()
  batch_type: string;

  @Column()
  qty: number;

  @Column()
  expiry_date!: string;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
}
