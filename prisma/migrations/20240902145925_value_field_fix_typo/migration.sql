/*
  Warnings:

  - You are about to drop the column `valie` on the `AppConfig` table. All the data in the column will be lost.
  - The primary key for the `Attribute` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `propertyType` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Attribute` table. All the data in the column will be lost.
  - The `id` column on the `Attribute` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `adjacencies` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `ally` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `attributes` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `client` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `equipment` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `externalAdviser` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `files` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `furnishedAread` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `pubicationTitle` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `services` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `statusHistory` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `PropertyAttribute` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `AppConfig` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `formType` on the `Attribute` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `publicationTitle` to the `GeneralInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FormTypes" AS ENUM ('check', 'text', 'select');

-- CreateEnum
CREATE TYPE "FormValueTypes" AS ENUM ('string', 'boolean', 'number');

-- AlterTable
ALTER TABLE "AppConfig" DROP COLUMN "valie",
ADD COLUMN     "value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_pkey",
DROP COLUMN "category",
DROP COLUMN "propertyType",
DROP COLUMN "value",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "formType",
ADD COLUMN     "formType" "FormTypes" NOT NULL,
ALTER COLUMN "placeholder" DROP NOT NULL,
ALTER COLUMN "options" DROP NOT NULL,
ADD CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DocumentsInformation" ALTER COLUMN "propertyDoc" SET DEFAULT false,
ALTER COLUMN "CIorRIF" SET DEFAULT false,
ALTER COLUMN "ownerCIorRIF" SET DEFAULT false,
ALTER COLUMN "spouseCIorRIF" SET DEFAULT false,
ALTER COLUMN "isCatastralRecordSameOwner" SET DEFAULT false,
ALTER COLUMN "condominiumSolvency" SET DEFAULT false,
ALTER COLUMN "mainProperty" SET DEFAULT false,
ALTER COLUMN "mortgageRelease" DROP NOT NULL,
ALTER COLUMN "condominiumSolvencyDetails" DROP NOT NULL,
ALTER COLUMN "power" DROP NOT NULL,
ALTER COLUMN "successionDeclaration" DROP NOT NULL,
ALTER COLUMN "courtRulings" DROP NOT NULL,
ALTER COLUMN "catastralRecordYear" DROP NOT NULL,
ALTER COLUMN "attorneyEmail" DROP NOT NULL,
ALTER COLUMN "attorneyPhone" DROP NOT NULL,
ALTER COLUMN "attorneyFirstName" DROP NOT NULL,
ALTER COLUMN "attorneyLastName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GeneralInformation" ADD COLUMN     "publicationTitle" TEXT NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "propertyCondition" DROP NOT NULL,
ALTER COLUMN "handoverKeys" SET DEFAULT false,
ALTER COLUMN "termsAndConditionsAccepted" SET DEFAULT false,
ALTER COLUMN "antiquity" DROP NOT NULL,
ALTER COLUMN "zoning" DROP NOT NULL,
ALTER COLUMN "amountOfFloors" DROP NOT NULL,
ALTER COLUMN "propertiesPerFloor" DROP NOT NULL,
ALTER COLUMN "typeOfWork" DROP NOT NULL,
ALTER COLUMN "isFurnished" SET DEFAULT false,
ALTER COLUMN "isOccupiedByPeople" SET DEFAULT false;

-- AlterTable
ALTER TABLE "LocationInformation" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "nomenclature" DROP NOT NULL,
ALTER COLUMN "tower" DROP NOT NULL,
ALTER COLUMN "amountOfFloors" DROP NOT NULL,
ALTER COLUMN "isClosedStreet" DROP NOT NULL,
ALTER COLUMN "municipality" DROP NOT NULL,
ALTER COLUMN "urbanization" DROP NOT NULL,
ALTER COLUMN "avenue" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "buildingShoppingCenter" DROP NOT NULL,
ALTER COLUMN "buildingNumber" DROP NOT NULL,
ALTER COLUMN "floor" DROP NOT NULL,
ALTER COLUMN "referencePoint" DROP NOT NULL,
ALTER COLUMN "howToGet" DROP NOT NULL,
ALTER COLUMN "trunkNumber" DROP NOT NULL,
ALTER COLUMN "trunkLevel" DROP NOT NULL,
ALTER COLUMN "parkingNumber" DROP NOT NULL,
ALTER COLUMN "parkingLevel" DROP NOT NULL;

-- AlterTable
ALTER TABLE "NegotiationInfomation" ADD COLUMN     "ally" TEXT,
ADD COLUMN     "externalAdviser" TEXT,
ADD COLUMN     "realStateAdviser" TEXT,
ALTER COLUMN "minimumNegotiation" DROP NOT NULL,
ALTER COLUMN "client" DROP NOT NULL,
ALTER COLUMN "reasonToSellOrRent" DROP NOT NULL,
ALTER COLUMN "partOfPayment" DROP NOT NULL,
ALTER COLUMN "mouthToMouth" SET DEFAULT false,
ALTER COLUMN "realStateGroups" SET DEFAULT false,
ALTER COLUMN "realStateWebPages" SET DEFAULT false,
ALTER COLUMN "socialMedia" SET DEFAULT false,
ALTER COLUMN "publicationOnBuilding" SET DEFAULT false,
ALTER COLUMN "ownerPaysCommission" DROP NOT NULL,
ALTER COLUMN "rentCommission" DROP NOT NULL,
ALTER COLUMN "sellCommission" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "adjacencies",
DROP COLUMN "ally",
DROP COLUMN "attributes",
DROP COLUMN "client",
DROP COLUMN "equipment",
DROP COLUMN "externalAdviser",
DROP COLUMN "files",
DROP COLUMN "furnishedAread",
DROP COLUMN "owner",
DROP COLUMN "pubicationTitle",
DROP COLUMN "services",
DROP COLUMN "statusHistory",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "furnishedAreas" TEXT[],
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "PropertyAttribute";

-- CreateTable
CREATE TABLE "AttributesOnProperties" (
    "propertyId" TEXT NOT NULL,
    "attribyteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" TEXT NOT NULL,
    "valueType" "FormValueTypes" NOT NULL DEFAULT 'string',

    CONSTRAINT "AttributesOnProperties_pkey" PRIMARY KEY ("propertyId","attribyteId")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "titlePlural" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMediaLink" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,

    CONSTRAINT "SocialMediaLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adjacency" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Adjacency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdjacenciesOnProperties" (
    "propertyId" TEXT NOT NULL,
    "adjacencyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdjacenciesOnProperties_pkey" PRIMARY KEY ("propertyId","adjacencyId")
);

-- CreateTable
CREATE TABLE "Utility" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Utility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtilitiesOnProperties" (
    "propertyId" TEXT NOT NULL,
    "utilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "additionalInformation" TEXT,

    CONSTRAINT "UtilitiesOnProperties_pkey" PRIMARY KEY ("propertyId","utilityId")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentsOnProperties" (
    "propertyId" TEXT NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brand" TEXT,
    "additionalInformation" TEXT,

    CONSTRAINT "EquipmentsOnProperties_pkey" PRIMARY KEY ("propertyId","equipmentId")
);

-- CreateTable
CREATE TABLE "_PropertyToUtility" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AttributeToProperty" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AdjacencyToProperty" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EquipmentToProperty" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToUtility_AB_unique" ON "_PropertyToUtility"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToUtility_B_index" ON "_PropertyToUtility"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttributeToProperty_AB_unique" ON "_AttributeToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_AttributeToProperty_B_index" ON "_AttributeToProperty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdjacencyToProperty_AB_unique" ON "_AdjacencyToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_AdjacencyToProperty_B_index" ON "_AdjacencyToProperty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToProperty_AB_unique" ON "_EquipmentToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToProperty_B_index" ON "_EquipmentToProperty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");

-- AddForeignKey
ALTER TABLE "AttributesOnProperties" ADD CONSTRAINT "AttributesOnProperties_attribyteId_fkey" FOREIGN KEY ("attribyteId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributesOnProperties" ADD CONSTRAINT "AttributesOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdjacenciesOnProperties" ADD CONSTRAINT "AdjacenciesOnProperties_adjacencyId_fkey" FOREIGN KEY ("adjacencyId") REFERENCES "Adjacency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdjacenciesOnProperties" ADD CONSTRAINT "AdjacenciesOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilitiesOnProperties" ADD CONSTRAINT "UtilitiesOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilitiesOnProperties" ADD CONSTRAINT "UtilitiesOnProperties_utilityId_fkey" FOREIGN KEY ("utilityId") REFERENCES "Utility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOnProperties" ADD CONSTRAINT "EquipmentsOnProperties_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOnProperties" ADD CONSTRAINT "EquipmentsOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToUtility" ADD CONSTRAINT "_PropertyToUtility_A_fkey" FOREIGN KEY ("A") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToUtility" ADD CONSTRAINT "_PropertyToUtility_B_fkey" FOREIGN KEY ("B") REFERENCES "Utility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProperty" ADD CONSTRAINT "_AttributeToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProperty" ADD CONSTRAINT "_AttributeToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdjacencyToProperty" ADD CONSTRAINT "_AdjacencyToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Adjacency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdjacencyToProperty" ADD CONSTRAINT "_AdjacencyToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToProperty" ADD CONSTRAINT "_EquipmentToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToProperty" ADD CONSTRAINT "_EquipmentToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
