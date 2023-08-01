import { PersonalizeRecipeDto } from './dto/personalize-recipe.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecipeDTO } from './dto/recipe.dto';

@ApiTags('recipes')
@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  async getAllRecipes(): Promise<RecipeDTO[]> {
    return this.recipeService.getAllRecipes();
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: number): Promise<RecipeDTO> {
    return this.recipeService.getRecipeById(id);
  }

  @Put(':id')
  async updateRecipe(
    @Param('id') id: number,
    @Body() recipeDto: Recipe,
  ): Promise<RecipeDTO> {
    return this.recipeService.updateRecipe(id, recipeDto);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: number): Promise<void> {
    return this.recipeService.deleteRecipe(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiResponse({
    status: 201,
    description: 'The recipe has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createRecipe(@Body() recipeDto: Recipe): Promise<RecipeDTO> {
    return this.recipeService.createRecipe(recipeDto);
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
