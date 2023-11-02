// Recipe.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IngrMgIngredients } from 'src/ingredient/entities/ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => IngrMgIngredients, (ingredient) => ingredient.recipe)
  ingredients: IngrMgIngredients[];
}
