import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('advs_mv_parts_link')
export class AdvsMvPartsLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  device_id: string;

  @Column('uuid')
  part_id: string;

  @Column({
    type: 'datetime', // Change type to 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  induction_date: string;

  @Column('uuid')
  created_by: string;

  @Column('uuid')
  modified_by: string;

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
