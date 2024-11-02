-- CreateTable
CREATE TABLE "Distribution" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Distribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistributionsOnProperties" (
    "propertyId" TEXT NOT NULL,
    "utilityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "additionalInformation" TEXT,

    CONSTRAINT "DistributionsOnProperties_pkey" PRIMARY KEY ("propertyId","utilityId")
);

-- CreateTable
CREATE TABLE "_PropertyToDistribution" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToDistribution_AB_unique" ON "_PropertyToDistribution"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToDistribution_B_index" ON "_PropertyToDistribution"("B");

-- AddForeignKey
ALTER TABLE "DistributionsOnProperties" ADD CONSTRAINT "DistributionsOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionsOnProperties" ADD CONSTRAINT "DistributionsOnProperties_utilityId_fkey" FOREIGN KEY ("utilityId") REFERENCES "Distribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToDistribution" ADD CONSTRAINT "_PropertyToDistribution_A_fkey" FOREIGN KEY ("A") REFERENCES "Distribution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToDistribution" ADD CONSTRAINT "_PropertyToDistribution_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
