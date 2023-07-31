import { Controller, Post, Body, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonalizeRecipeDto } from './dto/personalize-recipe.dto';

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

  @Post('personalize/:id')
  @ApiOperation({ summary: 'personalize a recipe' })
  @ApiResponse({
    status: 200,
    description: 'The recipe has been successfully personalized.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async personalizeRecipe(
    @Param() id: number,
    @Body() personalizeRecipeDto: PersonalizeRecipeDto,
  ): Promise<Recipe> {
    return this.recipeService.personalizeRecipe(id, personalizeRecipeDto);
  }

  @Post('flush-one/:id')
  async flushOne(@Param() id: number) {
    return await this.recipeService.flushOne(id);
  }

  @Post('flush-all')
  async flushAll() {
    return await this.recipeService.flushAll();
  }

  @Post('flush-all-disposable')
  async flushAllDisposable() {
    return await this.recipeService.flushAllDisposable();
  }
}
