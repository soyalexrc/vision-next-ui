/*
  Warnings:

  - You are about to drop the column `services` on the `Property` table. All the data in the column will be lost.
  - The `files` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `images` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `attributes` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `adjacencies` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `equipment` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[propertyId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "services",
DROP COLUMN "files",
ADD COLUMN     "files" JSONB,
DROP COLUMN "images",
ADD COLUMN     "images" JSONB,
DROP COLUMN "attributes",
ADD COLUMN     "attributes" JSONB,
DROP COLUMN "adjacencies",
ADD COLUMN     "adjacencies" JSONB[],
DROP COLUMN "equipment",
ADD COLUMN     "equipment" JSONB[];

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Service_propertyId_key" ON "Service"("propertyId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
