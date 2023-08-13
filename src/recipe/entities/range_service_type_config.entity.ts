import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RangeLevelCancup } from './range_level_cancup.entity'; // Replace with the actual import path

@Entity('range_service_type_config')
export class RangeServiceTypeConfig {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  range_id!: number;

  @Column()
  product_type!: number;

  @Column()
  product_category!: number;

  @Column()
  service_type!: number;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updated_at!: Date;

  @OneToMany(
    () => RangeLevelCancup,
    (rangeLevelCancup) => rangeLevelCancup.product_type,
  )
  rangeLevelCancups!: RangeLevelCancup[];
}
