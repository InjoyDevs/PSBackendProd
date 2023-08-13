import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('aprt_mv_part_digital_signature')
export class AprtMvPartDigitalSignature {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column({ type: 'varchar', length: 255 })
  sign_id!: string;

  @Column()
  part_id!: number;

  @Column({ type: 'text' })
  digital_sign!: string;

  @Column()
  created_by!: number;

  @Column()
  modified_by!: number;

  @DeleteDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  deleted_at!: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
}
