/*
  Warnings:

  - The primary key for the `Attribute` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Attribute` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `attributes` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `PropertyAttribute` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Attribute" DROP CONSTRAINT "Attribute_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "attributes";

-- DropTable
DROP TABLE "PropertyAttribute";

-- CreateTable
CREATE TABLE "AttributesOnProperties" (
    "propertyId" TEXT NOT NULL,
    "attribyteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttributesOnProperties_pkey" PRIMARY KEY ("propertyId","attribyteId")
);

-- CreateTable
CREATE TABLE "_AttributeToProperty" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AttributeToProperty_AB_unique" ON "_AttributeToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_AttributeToProperty_B_index" ON "_AttributeToProperty"("B");

-- AddForeignKey
ALTER TABLE "AttributesOnProperties" ADD CONSTRAINT "AttributesOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributesOnProperties" ADD CONSTRAINT "AttributesOnProperties_attribyteId_fkey" FOREIGN KEY ("attribyteId") REFERENCES "Attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProperty" ADD CONSTRAINT "_AttributeToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttributeToProperty" ADD CONSTRAINT "_AttributeToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
