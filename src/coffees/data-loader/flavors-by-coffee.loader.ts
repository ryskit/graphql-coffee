import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Flavor } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
  constructor(private readonly prisma: PrismaService) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
    const coffeesWithFlavors = await this.prisma.coffee.findMany({
      where: {
        id: {
          in: coffeeIds as number[],
        },
      },
      select: {
        id: true,
        flavors: {
          select: {
            flavor: true,
          },
        },
      },
    });
    return coffeesWithFlavors.map((coffee) =>
      coffee.flavors.map((f) => f.flavor),
    );
  }
}
