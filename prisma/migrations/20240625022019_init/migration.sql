-- CreateTable
CREATE TABLE "AppConfig" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "valie" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "AppConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemporalId" (
    "id" TEXT NOT NULL,

    CONSTRAINT "TemporalId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeleteFileRequest" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "DeleteFileRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ally" TEXT,
    "owner" TEXT,
    "externalAdviser" TEXT,
    "client" TEXT,
    "files" TEXT[],
    "pubicationTitle" TEXT NOT NULL,
    "images" TEXT[],
    "attributes" TEXT NOT NULL,
    "distribution" JSONB[],
    "services" JSONB[],
    "adjacencies" TEXT NOT NULL,
    "equipment" TEXT[],
    "furnishedAread" TEXT NOT NULL,
    "statusHistory" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentsInformation" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "propertyDoc" BOOLEAN NOT NULL,
    "CIorRIF" BOOLEAN NOT NULL,
    "ownerCIorRIF" BOOLEAN NOT NULL,
    "spouseCIorRIF" BOOLEAN NOT NULL,
    "isCatastralRecordSameOwner" BOOLEAN NOT NULL,
    "condominiumSolvency" BOOLEAN NOT NULL,
    "mainProperty" BOOLEAN NOT NULL,
    "mortgageRelease" TEXT NOT NULL,
    "condominiumSolvencyDetails" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "successionDeclaration" TEXT NOT NULL,
    "courtRulings" TEXT NOT NULL,
    "catastralRecordYear" TEXT NOT NULL,
    "attorneyEmail" TEXT NOT NULL,
    "attorneyPhone" TEXT NOT NULL,
    "attorneyFirstName" TEXT NOT NULL,
    "attorneyLastName" TEXT NOT NULL,

    CONSTRAINT "DocumentsInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralInformation" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "footageGround" TEXT NOT NULL,
    "footageBuilding" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "propertyCondition" TEXT NOT NULL,
    "handoverKeys" BOOLEAN NOT NULL,
    "termsAndConditionsAccepted" BOOLEAN NOT NULL,
    "antiquity" TEXT NOT NULL,
    "zoning" TEXT NOT NULL,
    "amountOfFloors" TEXT NOT NULL,
    "propertiesPerFloor" TEXT NOT NULL,
    "typeOfWork" TEXT NOT NULL,
    "isFurnished" BOOLEAN NOT NULL,
    "isOccupiedByPeople" BOOLEAN NOT NULL,

    CONSTRAINT "GeneralInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationInformation" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "nomenclature" TEXT NOT NULL,
    "tower" TEXT NOT NULL,
    "amountOfFloors" TEXT NOT NULL,
    "isClosedStreet" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "urbanization" TEXT NOT NULL,
    "avenue" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "buildingShoppingCenter" TEXT NOT NULL,
    "buildingNumber" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "referencePoint" TEXT NOT NULL,
    "howToGet" TEXT NOT NULL,
    "trunkNumber" TEXT NOT NULL,
    "trunkLevel" TEXT NOT NULL,
    "parkingNumber" TEXT NOT NULL,
    "parkingLevel" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "LocationInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NegotiationInfomation" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "minimumNegotiation" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "reasonToSellOrRent" TEXT NOT NULL,
    "partOfPayment" TEXT NOT NULL,
    "mouthToMouth" BOOLEAN NOT NULL,
    "realStateGroups" BOOLEAN NOT NULL,
    "realStateWebPages" BOOLEAN NOT NULL,
    "socialMedia" BOOLEAN NOT NULL,
    "publicationOnBuilding" BOOLEAN NOT NULL,
    "operationType" TEXT NOT NULL,
    "propertyExclusivity" TEXT NOT NULL,
    "ownerPaysCommission" TEXT NOT NULL,
    "rentCommission" TEXT NOT NULL,
    "sellCommission" TEXT NOT NULL,

    CONSTRAINT "NegotiationInfomation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyStatusEntry" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "PropertyStatusEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyAttribute" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "PropertyAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubService" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "SubService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentsInformation_propertyId_key" ON "DocumentsInformation"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "GeneralInformation_propertyId_key" ON "GeneralInformation"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "LocationInformation_propertyId_key" ON "LocationInformation"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "NegotiationInfomation_propertyId_key" ON "NegotiationInfomation"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyStatusEntry_propertyId_key" ON "PropertyStatusEntry"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "SubService_serviceId_key" ON "SubService"("serviceId");

-- AddForeignKey
ALTER TABLE "DocumentsInformation" ADD CONSTRAINT "DocumentsInformation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneralInformation" ADD CONSTRAINT "GeneralInformation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationInformation" ADD CONSTRAINT "LocationInformation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NegotiationInfomation" ADD CONSTRAINT "NegotiationInfomation_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyStatusEntry" ADD CONSTRAINT "PropertyStatusEntry_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubService" ADD CONSTRAINT "SubService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
