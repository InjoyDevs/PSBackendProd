// src/ingredients/ingredient.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientDTO } from './dto/ingredient.dto';

@Injectable()
export class IngredientService {
  createIngredient(): Ingredient | PromiseLike<Ingredient> {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(ingredientDto: IngredientDTO): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.create(ingredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  async findByRecipeId(recipeId: number): Promise<Ingredient[]> {
    return this.ingredientRepository.find({
      where: { recipe: { id: recipeId } },
    });
  }

  async update(id: number, ingredientDto: IngredientDTO): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id },
    });
    if (!ingredient) {
      throw new Error('Ingredient not found');
    }
    Object.assign(ingredient, ingredientDto);
    return this.ingredientRepository.save(ingredient);
  }

  async delete(id: number): Promise<void> {
    await this.ingredientRepository.delete(id);
  }
}
