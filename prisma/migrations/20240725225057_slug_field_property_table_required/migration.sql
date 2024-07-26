/*
  Warnings:

  - Made the column `slug` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "slug" SET NOT NULL;
