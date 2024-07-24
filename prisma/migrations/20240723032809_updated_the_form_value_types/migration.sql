/*
  Warnings:

  - Changed the type of `valueType` on the `Attribute` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FormValueTypes" AS ENUM ('string', 'boolean', 'number');

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "valueType",
ADD COLUMN     "valueType" "FormValueTypes" NOT NULL;
