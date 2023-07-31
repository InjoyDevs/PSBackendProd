import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { PersonalizeRecipeDto } from './dto/personalize-recipe.dto';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { RecipeDTO } from './dto/recipe.dto';

@Injectable()
export class RecipeService {
  [x: string]: any;
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
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

  async personalizeRecipe(
    recipeId: number,
    personalizeRecipeDto: PersonalizeRecipeDto,
  ): Promise<Recipe> {
    const findRecipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!findRecipe) throw new NotFoundException('Recipe not found');

    const inventories = await this.inventoryRepository.findBy({
      id: In(personalizeRecipeDto.IngredientIds),
    });

    if (inventories.length !== personalizeRecipeDto.IngredientIds.length)
      throw new NotFoundException('One or more ingredients were not found');

    // TODO:
    // Update the recipe with the given Ingredients and percentages
    // Return the updated recipe

    return findRecipe;
  }

  async flushOne(recipeId: number) {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!recipe)
      throw new NotFoundException(`Recipe with id ${recipeId} not found`);
    // TODO: Implement flush for a specific recipe.
  }

  async flushAll() {
    // TODO: Implement flush for all recipes.
  }

  async flushAllDisposable() {
    // TODO: Implement flush for all disposable recipes.
  }
}
