import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CartMgCancupSizeConfig } from './cart_mg_cancup_size_config.entity';

@Entity('recipe_can_cup_config')
export class RecipeCancupConfig {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  catalogue_id!: number;

  @Column()
  recipe_id!: number;

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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  deleted_at!: Date;

  @ManyToOne(
    () => CartMgCancupSizeConfig,
    (cartMgCancupSizeConfig) => cartMgCancupSizeConfig.id,
  )
  @JoinColumn({ name: 'cancup_id' })
  cancup!: CartMgCancupSizeConfig;
}
