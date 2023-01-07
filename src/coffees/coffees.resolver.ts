import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/graphql';

@Resolver()
export class CoffeesResolver {
  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return [];
  }
}
