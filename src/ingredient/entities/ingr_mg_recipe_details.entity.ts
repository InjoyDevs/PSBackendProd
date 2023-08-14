import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IngrMgIngredients } from './ingredient.entity';
import { IngrMgRecipeCatalogue } from './ingr_mg_recipe_catalogue.entity';

@Entity('ingr_mg_recipe_details')
export class IngrMgRecipeDetails {
  @PrimaryGeneratedColumn('increment') id!: number;

  @Column()
  recipe_id!: number;

  @Column()
  ingredient_id!: number;

  @Column()
  is_included!: boolean;

  @Column()
  value!: number;

  @DeleteDateColumn({ type: 'datetime', default: null, nullable: true })
  deleted_at?: Date;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @ManyToOne(() => IngrMgRecipeCatalogue)
  @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
  recipe!: IngrMgRecipeCatalogue;

  @ManyToOne(() => IngrMgIngredients)
  @JoinColumn({ name: 'ingredient_id', referencedColumnName: 'id' })
  ingredient!: IngrMgIngredients;
}
