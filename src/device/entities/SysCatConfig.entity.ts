import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity('sys_cat_config_n_values')
export class SysCatConfig {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column()
  category: string;

  @Column()
  type: string;

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
