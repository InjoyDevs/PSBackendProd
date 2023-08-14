import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('advs_mv_io_dock_parts_link')
export class AdvsMvIoDockPartsLink {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  dock_point_id!: number;

  @Column()
  part_id!: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;
  // You can add relationships here if needed
}
