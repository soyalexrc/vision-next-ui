/*
  Warnings:

  - You are about to drop the column `category` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType` on the `Attribute` table. All the data in the column will be lost.
  - Added the required column `valueType` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "category",
DROP COLUMN "propertyType",
ADD COLUMN     "valueType" TEXT NOT NULL,
ALTER COLUMN "placeholder" DROP NOT NULL,
ALTER COLUMN "options" DROP NOT NULL;
