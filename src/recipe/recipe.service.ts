import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngrMgRecipeCatalogue } from './entities/recipe.entity';
import { PersonalizeRecipeDto } from './dto/personalize-recipe.dto';

import { RecipeDTO } from './dto/recipe.dto';
import { InventoryService } from 'src/inventory/inventory.service';

@Injectable()
export class RecipeService {
  [x: string]: any;
  constructor(
    @InjectRepository(IngrMgRecipeCatalogue)
    private recipeRepository: Repository<IngrMgRecipeCatalogue>,
    private inventoryService: InventoryService,
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
  async createRecipe(recipeDto: IngrMgRecipeCatalogue): Promise<RecipeDTO> {
    const newRecipe = await this.recipeRepository.save(recipeDto);
    return this.mapToRecipeDto(newRecipe);
  }

  // to update the recipe
  async updateRecipe(
    id: number,
    recipeDto: IngrMgRecipeCatalogue,
  ): Promise<RecipeDTO> {
    await this.recipeRepository.update(id, recipeDto);
    return this.getRecipeById(id);
  }

  // to delete the recipe
  async deleteRecipe(id: number): Promise<void> {
    await this.recipeRepository.delete(id);
  }

  async personalizeRecipe(
    recipeId: number,
    /* eslint-disable */
    personalizeRecipeDto: PersonalizeRecipeDto,
  ): Promise<IngrMgRecipeCatalogue> {
    const findRecipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!findRecipe) throw new NotFoundException('Recipe not found');
    // TODO:
    // This does not follow dependency inversion principle well so will need to refactor this

    const inventories = await this.inventoryService.getInventoriesByIds(
      personalizeRecipeDto.IngredientIds,
    );

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
