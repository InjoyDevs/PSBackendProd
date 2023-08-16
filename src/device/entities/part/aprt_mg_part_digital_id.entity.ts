import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('aprt_mg_part_digital_id')
export class AprtMgPartDigitalId {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  part_type!: number;

  @Column({ type: 'varchar', length: 255 })
  part_code!: string;

  @Column({ type: 'varchar', length: 255 })
  sr_no!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  part_spec_details!: string;

  @Column({ type: 'double precision' })
  capacity!: number;

  @Column({ type: 'datetime', nullable: true })
  purchase_date!: Date;

  @Column()
  service_life_hours!: number;

  @Column({ type: 'datetime', nullable: true })
  commissioning_date!: Date;

  @Column({ type: 'datetime', nullable: true })
  expiry_date!: Date;

  @Column()
  created_by!: number;

  @Column()
  modified_by!: number;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
}
