import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IngrMgIngredients } from './ingredient.entity'; // Replace with the actual import path

@Entity('ingr_mg_mixing_config')
export class IngrMgMixingConfig {
  @PrimaryGeneratedColumn('increment') id: number;

  @Column()
  dry_volume: number;

  @Column()
  liquid_volume: number;

  @Column()
  produced_ingredient_volume: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @OneToMany(
    () => IngrMgIngredients,
    (ingrMgIngredients) => ingrMgIngredients.id,
  )
  @JoinColumn({ name: 'dry_ingredient_id' })
  dry_ingredients: IngrMgIngredients[];

  @OneToMany(
    () => IngrMgIngredients,
    (ingrMgIngredients) => ingrMgIngredients.id,
  )
  @JoinColumn({ name: 'liquid_ingredient_id' })
  liquid_ingredients: IngrMgIngredients[];

  @OneToMany(
    () => IngrMgIngredients,
    (ingrMgIngredients) => ingrMgIngredients.id,
  )
  @JoinColumn({ name: 'produced_ingredient_id' })
  produced_ingredients: IngrMgIngredients[];
}
