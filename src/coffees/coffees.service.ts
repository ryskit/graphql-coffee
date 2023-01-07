import { Injectable } from '@nestjs/common';
import { Coffee } from '@prisma/client';
import { UserInputError } from 'apollo-server-express';
import { CreateCoffeeInput, UpdateCoffeeInput } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoffeesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Coffee[]> {
    return this.prisma.coffee.findMany();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.prisma.coffee.findFirst({
      where: {
        id,
      },
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const coffee = await this.prisma.coffee.create({
      data: {
        name: createCoffeeInput.name,
        brand: createCoffeeInput.brand,
        flavors: createCoffeeInput.flavors,
      },
    });
    return coffee;
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const coffee = await this.prisma.coffee.findFirst({
      where: {
        id,
      },
    });
    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.prisma.coffee.update({
      where: {
        id,
      },
      data: {
        ...coffee,
        ...updateCoffeeInput,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.coffee.delete({
      where: {
        id,
      },
    });
  }
}
