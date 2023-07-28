import { Controller, Post, Body } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './entities/ingredient.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new ingredient' })
  @ApiResponse({
    status: 201,
    description: 'The ingredient has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createIngredient(@Body() ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientService.createIngredient(ingredient);
  }
}
