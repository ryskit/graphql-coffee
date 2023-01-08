-- CreateTable
CREATE TABLE "FlavorsOnCoffees" (
    "coffeeId" INTEGER NOT NULL,
    "flavorId" INTEGER NOT NULL,

    CONSTRAINT "FlavorsOnCoffees_pkey" PRIMARY KEY ("coffeeId","flavorId")
);

-- AddForeignKey
ALTER TABLE "FlavorsOnCoffees" ADD CONSTRAINT "FlavorsOnCoffees_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "Coffee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlavorsOnCoffees" ADD CONSTRAINT "FlavorsOnCoffees_flavorId_fkey" FOREIGN KEY ("flavorId") REFERENCES "Flavor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
