import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';

@Module({
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver],
  imports: [PrismaModule, PubSubModule],
})
export class CoffeesModule {}
