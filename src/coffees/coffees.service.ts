import { Injectable } from '@nestjs/common';
import { Flavor, CoffeeType as PrismaCoffeeType } from '@prisma/client';
import { UserInputError } from 'apollo-server-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Coffee, CoffeeType } from 'src/graphql';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CoffeesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pubSub: PubSub,
  ) {}

  async findAll(): Promise<Coffee[]> {
    const coffees = await this.prisma.coffee.findMany();

    return coffees.map((c) => {
      return {
        id: c.id,
        name: c.name,
        brand: c.brand,
        flavors: [],
        createdAt: c.createdAt,
        type: this.getCoffeeType(c.type),
      };
    });
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.prisma.coffee.findUnique({
      where: {
        id,
      },
    });

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }

    return {
      id: coffee.id,
      name: coffee.name,
      brand: coffee.brand,
      flavors: [],
      createdAt: coffee.createdAt,
      type: this.getCoffeeType(coffee.type),
    };
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = await this.prisma.coffee.create({
      data: {
        ...createCoffeeInput,
        flavors: {
          createMany: {
            data: flavors.map((flv) => {
              return {
                flavorId: flv.id,
              };
            }),
          },
        },
      },
      include: {
        flavors: {
          select: {
            flavor: true,
          },
        },
      },
    });

    const newCoffee = {
      id: coffee.id,
      name: coffee.name,
      brand: coffee.brand,
      flavors: coffee.flavors.map((f) => f['flavor']),
      createdAt: coffee.createdAt,
      type: this.getCoffeeType(coffee.type),
    };
    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffee });
    return newCoffee;
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const coffee = await this.prisma.coffee.findFirst({
      where: {
        id,
      },
      include: {
        flavors: true,
      },
    });

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }

    const updateFravorsInput =
      (updateCoffeeInput.flavors &&
        (await Promise.all(
          updateCoffeeInput.flavors.map((flavor) =>
            this.preloadFlavorByName(flavor),
          ),
        ))) ??
      [];

    const [_, result] = await this.prisma.$transaction([
      this.prisma.flavorsOnCoffees.deleteMany({
        where: {
          OR: coffee.flavors.map((cf) => {
            return {
              coffeeId: cf.coffeeId,
              flavorId: cf.flavorId,
            };
          }),
        },
      }),

      this.prisma.coffee.update({
        where: {
          id,
        },
        data: {
          ...coffee,
          ...updateCoffeeInput,
          flavors: {
            connectOrCreate: updateFravorsInput.map((f) => {
              return {
                where: {
                  coffeeId_flavorId: {
                    coffeeId: id,
                    flavorId: f.id,
                  },
                },
                create: {
                  flavorId: f.id,
                },
              };
            }),
          },
        },
        include: {
          flavors: {
            include: {
              flavor: true,
            },
          },
        },
      }),
    ]);

    return {
      id: coffee.id,
      name: coffee.name,
      brand: coffee.brand,
      flavors: result.flavors.map((f) => f.flavor),
      createdAt: coffee.createdAt,
      type: this.getCoffeeType(coffee.type),
    };
  }

  async remove(id: number) {
    const deletedCoffee = await this.prisma.coffee.delete({
      where: {
        id,
      },
      include: {
        flavors: {
          select: {
            flavor: true,
          },
        },
      },
    });

    return {
      id: deletedCoffee.id,
      name: deletedCoffee.name,
      brand: deletedCoffee.brand,
      flavors: deletedCoffee.flavors.map((f) => f['flavor']),
      createdAt: deletedCoffee.createdAt,
      type: this.getCoffeeType(deletedCoffee.type),
    };
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.prisma.flavor.findFirst({
      where: {
        name,
      },
    });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.prisma.flavor.create({
      data: {
        name,
      },
    });
  }

  private getCoffeeType(type: PrismaCoffeeType | null): CoffeeType | null {
    switch (type) {
      case null:
        return null;
      case PrismaCoffeeType.ARABICA:
        return CoffeeType.ARABICA;
      case PrismaCoffeeType.ROBUSTA:
        return CoffeeType.ROBUSTA;
    }
  }
}
