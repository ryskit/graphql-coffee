import { Module } from '@nestjs/common';
import { DrinksResolver } from './drinks.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DrinksResolver],
  imports: [PrismaModule],
})
export class DrinksModule {}
