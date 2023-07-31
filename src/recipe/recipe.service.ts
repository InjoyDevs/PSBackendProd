import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { PersonalizeRecipeDto } from './dto/personalize-recipe.dto';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async createRecipe(recipe: Recipe): Promise<Recipe> {
    return await this.recipeRepository.save(recipe);
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
