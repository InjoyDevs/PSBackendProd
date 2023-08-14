import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { CartMgCancupSizeConfig } from './cart_mg_cancup_size_config.entity';

@Entity('range_level_cancup')
export class RangeLevelCancup {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  range_id!: number;

  @Column()
  product_type!: number;

  @Column()
  product_category!: number;

  @Column()
  service_type!: number;

  @Column()
  is_inherited!: boolean;

  @Column()
  is_active!: boolean;

  @Column()
  cancup_id!: number;

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

  @ManyToOne(
    () => CartMgCancupSizeConfig,
    (cancupSizeConfig) => cancupSizeConfig.id,
  )
  @JoinColumn({ name: 'cancup_id' })
  cancupSizeConfig!: CartMgCancupSizeConfig;
}
