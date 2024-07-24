/*
  Warnings:

  - You are about to drop the column `adjacencies` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "adjacencies";

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
CREATE TABLE "_AdjacencyToProperty" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdjacencyToProperty_AB_unique" ON "_AdjacencyToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_AdjacencyToProperty_B_index" ON "_AdjacencyToProperty"("B");

-- AddForeignKey
ALTER TABLE "AdjacenciesOnProperties" ADD CONSTRAINT "AdjacenciesOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdjacenciesOnProperties" ADD CONSTRAINT "AdjacenciesOnProperties_adjacencyId_fkey" FOREIGN KEY ("adjacencyId") REFERENCES "Adjacency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdjacencyToProperty" ADD CONSTRAINT "_AdjacencyToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Adjacency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdjacencyToProperty" ADD CONSTRAINT "_AdjacencyToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
