/*
  Warnings:

  - You are about to drop the column `brand` on the `Equipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "brand";

-- AlterTable
ALTER TABLE "EquipmentsOnProperties" ADD COLUMN     "additionalInformation" TEXT,
ADD COLUMN     "brand" TEXT;

-- AlterTable
ALTER TABLE "UtilitiesOnProperties" ADD COLUMN     "additionalInformation" TEXT;
