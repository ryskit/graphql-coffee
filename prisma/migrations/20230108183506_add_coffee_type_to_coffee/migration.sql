-- CreateEnum
CREATE TYPE "CoffeeType" AS ENUM ('ARABICA', 'ROBUSTA');

-- AlterTable
ALTER TABLE "Coffee" ADD COLUMN     "type" "CoffeeType";
