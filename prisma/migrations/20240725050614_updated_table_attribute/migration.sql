/*
  Warnings:

  - You are about to drop the column `valueType` on the `Attribute` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "valueType";

-- AlterTable
ALTER TABLE "AttributesOnProperties" ADD COLUMN     "valueType" "FormValueTypes" NOT NULL DEFAULT 'string';
