import { MinLength } from 'class-validator';
import * as GraphQLTypes from '../../graphql';

export class CreateCoffeeInput extends GraphQLTypes.UpdateCoffeeInput {
  @MinLength(3)
  name: string;
}
