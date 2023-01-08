import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Coffee } from 'src/graphql';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class CoffeesResolver {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly pubSub: PubSub,
  ) {}

  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Query('coffee')
  async findOne(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeesService.findOne(id);
  }

  @Mutation('createCoffee')
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ): Promise<Coffee> {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
  ): Promise<Coffee> {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation('removeCoffee')
  async remove(@Args('id', ParseIntPipe) id: number): Promise<Coffee> {
    return this.coffeesService.remove(id);
  }

  @Subscription()
  coffeeAdded() {
    return this.pubSub.asyncIterator('coffeeAdded');
  }
}
