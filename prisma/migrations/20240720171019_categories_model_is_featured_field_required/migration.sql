/*
  Warnings:

  - Made the column `isFeatured` on table `Categories` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Categories" ALTER COLUMN "isFeatured" SET NOT NULL;
