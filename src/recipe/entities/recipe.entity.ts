import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  preparation_time: number;

  @Column()
  cooking_time: number;

  @Column()
  servings: number;

  @OneToMany(() => Ingredient, ingredient => ingredient.recipe)
  ingredients: Ingredient[];
}
