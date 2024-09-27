-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "isInvestor" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ally" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Ally_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "usageProperty" TEXT NOT NULL,
    "referrer" TEXT NOT NULL,
    "contactFrom" TEXT NOT NULL,
    "requirementStatus" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "propertyOfInterest" TEXT NOT NULL,
    "propertyLocation" TEXT NOT NULL,
    "typeOfCapture" TEXT NOT NULL,
    "aspiredPrice" TEXT NOT NULL,
    "typeOfBusiness" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "isPotentialInvestor" BOOLEAN NOT NULL,
    "zonesOfInterest" JSONB NOT NULL,
    "essentialFeatures" JSONB NOT NULL,
    "amountOfPeople" INTEGER NOT NULL,
    "amountOfPets" INTEGER NOT NULL,
    "amountOfYounger" INTEGER NOT NULL,
    "arrivingDate" TIMESTAMP(3),
    "checkoutDate" TIMESTAMP(3),
    "amountOfNights" INTEGER NOT NULL,
    "reasonOfStay" TEXT NOT NULL,
    "usageOfProperty" TEXT NOT NULL,
    "typeOfPerson" TEXT NOT NULL,
    "personEntry" TEXT NOT NULL,
    "personHeadquarters" TEXT NOT NULL,
    "personLocation" TEXT NOT NULL,
    "specificRequirement" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "remodeledAreas" TEXT NOT NULL,
    "propertyDistribution" TEXT NOT NULL,
    "m2" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "userFullName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "subServiceName" TEXT NOT NULL,
    "subServiceId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "interestDate" TIMESTAMP(3),
    "appointmentDate" TIMESTAMP(3),
    "inspectionDate" TIMESTAMP(3),

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalAdviser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "realStateCompanyName" TEXT NOT NULL,

    CONSTRAINT "ExternalAdviser_pkey" PRIMARY KEY ("id")
);
