import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CoffeesResolver, CoffeesService],
  imports: [PrismaModule],
})
export class CoffeesModule {}
