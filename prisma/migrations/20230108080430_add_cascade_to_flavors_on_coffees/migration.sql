-- DropForeignKey
ALTER TABLE "FlavorsOnCoffees" DROP CONSTRAINT "FlavorsOnCoffees_coffeeId_fkey";

-- DropForeignKey
ALTER TABLE "FlavorsOnCoffees" DROP CONSTRAINT "FlavorsOnCoffees_flavorId_fkey";

-- AddForeignKey
ALTER TABLE "FlavorsOnCoffees" ADD CONSTRAINT "FlavorsOnCoffees_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlavorsOnCoffees" ADD CONSTRAINT "FlavorsOnCoffees_flavorId_fkey" FOREIGN KEY ("flavorId") REFERENCES "Flavor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
