import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';

@Module({
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver],
  imports: [PrismaModule],
})
export class CoffeesModule {}
