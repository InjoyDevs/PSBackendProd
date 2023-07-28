import { Controller, Post, Body } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiResponse({
    status: 201,
    description: 'The recipe has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createRecipe(@Body() recipe: Recipe): Promise<Recipe> {
    return this.recipeService.createRecipe(recipe);
  }
}
