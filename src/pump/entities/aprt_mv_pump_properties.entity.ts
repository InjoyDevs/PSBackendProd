import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('aprt_mv_pump_properties')
export class AprtMvPumpProperties {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  part_code: number;

  @Column()
  pump_type: number;

  @Column('double')
  pipe_length_mm: number;

  @Column('double')
  pipe_dia: number;

  @Column('double')
  volume_ml: number;

  @Column()
  created_by: number;

  @Column()
  modified_by: number;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
