import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'invt_tv_transact_q_executed_link' })
export class InvtTvTransactQExecutedLink {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'integer' })
  transactionQ_id!: string;

  @Column({ type: 'integer' })
  realized_transaction_id!: string;

  @Column()
  status!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: string;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;
}
