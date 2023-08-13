import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('aprt_mv_part_digital_id')
export class AprtMvPartDigitalId {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  part_id!: number;

  @Column()
  id_type!: number;

  @Column({ type: 'varchar', length: 255 })
  id_value!: string;

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
