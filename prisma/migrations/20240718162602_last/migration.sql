/*
  Warnings:

  - You are about to drop the column `ally` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `client` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `externalAdviser` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `files` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `furnishedAread` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `pubicationTitle` on the `Property` table. All the data in the column will be lost.
  - Added the required column `publicationTitle` to the `GeneralInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `realStateAdviser` to the `NegotiationInfomation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneralInformation" ADD COLUMN     "publicationTitle" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NegotiationInfomation" ADD COLUMN     "ally" TEXT,
ADD COLUMN     "externalAdviser" TEXT,
ADD COLUMN     "realStateAdviser" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "ally",
DROP COLUMN "client",
DROP COLUMN "externalAdviser",
DROP COLUMN "files",
DROP COLUMN "furnishedAread",
DROP COLUMN "images",
DROP COLUMN "pubicationTitle",
ADD COLUMN     "furnishedAreas" TEXT[];
