import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('aprt_mv_pump_drive_properties')
export class AprtMvPumpDriveProperties {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  part_code!: number;

  @Column()
  voltage!: number;

  @Column()
  pwm_speed!: number;

  @Column({ type: 'varchar', length: 255 })
  rotate_or_pulse!: string;

  @Column()
  volume_ml!: number;

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
