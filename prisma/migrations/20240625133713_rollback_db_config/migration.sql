/*
  Warnings:

  - The `files` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `images` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `attributes` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "files",
ADD COLUMN     "files" TEXT[],
DROP COLUMN "images",
ADD COLUMN     "images" TEXT[],
DROP COLUMN "attributes",
ADD COLUMN     "attributes" JSONB[];
