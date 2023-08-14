import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { IngrMgIngredients } from 'src/ingredient/entities/ingredient.entity';
import { InvtTdIngredientBatch } from './invt_td_ingredient_batch.entity';

@Entity()
export class InvtTdDvsIngrBatchVolStat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  device_id: bigint;

  @Column()
  ingredient_id: bigint;

  @Column()
  current_batch_id: bigint;

  @Column()
  current_volume: number;

  @Column()
  available_for_booking: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne((type) => IngrMgIngredients)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: IngrMgIngredients;

  @ManyToOne((type) => InvtTdIngredientBatch)
  @JoinColumn({ name: 'current_batch_id' })
  currentBatch: InvtTdIngredientBatch;

  // @OneToMany(type => InvtTdDvsIngrBatchVolStat, child => child.ingredient)
  // children: InvtTdDvsIngrBatchVolStat[];
}
