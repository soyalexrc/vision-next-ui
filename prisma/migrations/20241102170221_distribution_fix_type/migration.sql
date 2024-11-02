/*
  Warnings:

  - The primary key for the `DistributionsOnProperties` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `utilityId` on the `DistributionsOnProperties` table. All the data in the column will be lost.
  - Added the required column `distributionId` to the `DistributionsOnProperties` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DistributionsOnProperties" DROP CONSTRAINT "DistributionsOnProperties_utilityId_fkey";

-- AlterTable
ALTER TABLE "DistributionsOnProperties" DROP CONSTRAINT "DistributionsOnProperties_pkey",
DROP COLUMN "utilityId",
ADD COLUMN     "distributionId" INTEGER NOT NULL,
ADD CONSTRAINT "DistributionsOnProperties_pkey" PRIMARY KEY ("propertyId", "distributionId");

-- AddForeignKey
ALTER TABLE "DistributionsOnProperties" ADD CONSTRAINT "DistributionsOnProperties_distributionId_fkey" FOREIGN KEY ("distributionId") REFERENCES "Distribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
