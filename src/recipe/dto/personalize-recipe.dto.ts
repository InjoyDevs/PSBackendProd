import { ApiProperty } from '@nestjs/swagger';

export class PersonalizeRecipeDto {
  @ApiProperty({
    description: 'Ingredient IDs of the ingredients to be personalized',
  })
  IngredientIds: number[];

  @ApiProperty({ description: 'Percentage personalization per ingredient' })
  percentages: number[];
}
