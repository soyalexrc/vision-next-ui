/*
  Warnings:

  - Added the required column `from` to the `ContactForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactForm" ADD COLUMN     "from" TEXT NOT NULL;
