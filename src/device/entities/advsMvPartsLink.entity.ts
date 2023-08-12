import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity('advs_mv_parts_link')
export class AdvsMvPartsLink {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  device_id: UUID;

  @Column()
  part_id: UUID;

  @Column({
    type: 'datetime', // Change type to 'datetime'
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  induction_date: string;

  @Column()
  created_by: UUID;

  @Column()
  modified_by: UUID;

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
