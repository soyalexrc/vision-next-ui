/*
  Warnings:

  - Changed the type of `formType` on the `Attribute` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FormTypes" AS ENUM ('check', 'text', 'select');

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "formType",
ADD COLUMN     "formType" "FormTypes" NOT NULL;
