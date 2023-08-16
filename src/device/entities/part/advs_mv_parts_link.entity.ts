import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('advs_mv_parts_link')
export class AdvsMvPartsLink {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column()
  device_id: string;

  @Column()
  part_id: string;

  @Column({
    type: 'datetime', // Change type to 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  induction_date: string;

  @Column()
  created_by: string;

  @Column()
  modified_by: string;

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
