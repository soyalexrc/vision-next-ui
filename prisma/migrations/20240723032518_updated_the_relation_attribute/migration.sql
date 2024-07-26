/*
  Warnings:

  - You are about to drop the column `value` on the `Attribute` table. All the data in the column will be lost.
  - Added the required column `value` to the `AttributesOnProperties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "value";

-- AlterTable
ALTER TABLE "AttributesOnProperties" ADD COLUMN     "value" TEXT NOT NULL;
