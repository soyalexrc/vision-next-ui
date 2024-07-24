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

    CONSTRAINT "UtilitiesOnProperties_pkey" PRIMARY KEY ("propertyId","utilityId")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "brand" TEXT,
    "description" TEXT,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentsOnProperties" (
    "propertyId" TEXT NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipmentsOnProperties_pkey" PRIMARY KEY ("propertyId","equipmentId")
);

-- AddForeignKey
ALTER TABLE "UtilitiesOnProperties" ADD CONSTRAINT "UtilitiesOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UtilitiesOnProperties" ADD CONSTRAINT "UtilitiesOnProperties_utilityId_fkey" FOREIGN KEY ("utilityId") REFERENCES "Utility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOnProperties" ADD CONSTRAINT "EquipmentsOnProperties_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOnProperties" ADD CONSTRAINT "EquipmentsOnProperties_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
