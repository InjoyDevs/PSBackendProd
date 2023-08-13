import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('advs_mv_parts_link')
export class AdvsMvPartsLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  device_id: number;

  @Column()
  part_id: number;

  @Column({
    type: 'datetime', // Change type to 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  induction_date: string;

  @Column()
  created_by: number;

  @Column()
  modified_by: number;

  @Column({
    type: 'datetime', // Change type to 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  deleted_at: string;

  @Column({
    type: 'datetime', // Change type to 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: string;

  @Column({
    type: 'datetime', // Change type to 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updated_at: string;
}
