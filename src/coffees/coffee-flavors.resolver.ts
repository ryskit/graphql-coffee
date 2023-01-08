import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver('Coffee')
export class CoffeeFlavorsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField('flavors')
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.prisma.flavor.findMany({
      where: {
        coffees: {
          some: {
            coffeeId: coffee.id,
          },
        },
      },
    });
  }
}
