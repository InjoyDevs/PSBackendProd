import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { IngrMgIngredients } from 'src/ingredient/entities/ingredient.entity';
import { InvtTdIngredientBatch } from './invt_td_ingredient_batch.entity';

@Entity('invt_td_dvs_ingr_batch_vol_stat')
export class InvtTdDvsIngrBatchVolStat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  device_id: number;

  @Column()
  ingredient_id: number;

  @Column()
  current_batch_id: number;

  @Column()
  current_volume: number;

  @Column()
  available_for_booking: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => IngrMgIngredients)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: IngrMgIngredients;

  @ManyToOne(() => InvtTdIngredientBatch)
  @JoinColumn({ name: 'current_batch_id' })
  currentBatch: InvtTdIngredientBatch;

  // @OneToMany(type => InvtTdDvsIngrBatchVolStat, child => child.ingredient)
  // children: InvtTdDvsIngrBatchVolStat[];
}
