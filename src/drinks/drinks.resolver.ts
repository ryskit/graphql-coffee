import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee, Drink, Tea } from 'src/graphql';

@Resolver('Drink')
export class DrinksResolver {
  @Query('drinks')
  async findAll(): Promise<Drink[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';

    const tea = new Tea();
    tea.name = 'Lipton';
    return [tea, coffee];
  }

  @ResolveField()
  __resolveType(value: Drink) {
    if (value instanceof Coffee) {
      return 'Coffee';
    } else if (value instanceof Tea) {
      return 'Tea';
    }
    return null;
  }
}
