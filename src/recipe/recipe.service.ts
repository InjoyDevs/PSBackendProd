import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeDTO } from './dto/recipe.dto';

@Injectable()
export class RecipeService {
  [x: string]: any;
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  // to get all the recipes
  async getAllRecipes(): Promise<RecipeDTO[]> {
    const recipes = await this.recipeRepository.find();
    return recipes.map((recipe) => this.mapToRecipeDto(recipe));
  }

  // get recipe by its id
  async getRecipeById(id: number): Promise<RecipeDTO> {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return this.mapToRecipeDto(recipe);
  }

  // for creating the recipe
  async createRecipe(recipeDto: Recipe): Promise<RecipeDTO> {
    const newRecipe = await this.recipeRepository.save(recipeDto);
    return this.mapToRecipeDto(newRecipe);
  }

  // to update the recipe
  async updateRecipe(id: number, recipeDto: Recipe): Promise<RecipeDTO> {
    await this.recipeRepository.update(id, recipeDto);
    return this.getRecipeById(id);
  }

  // to delete the recipe
  async deleteRecipe(id: number): Promise<void> {
    await this.recipeRepository.delete(id);
  }
}
