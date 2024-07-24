/*
  Warnings:

  - You are about to drop the column `equipment` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_propertyId_fkey";

-- DropIndex
DROP INDEX "Service_propertyId_key";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "equipment";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "propertyId";
