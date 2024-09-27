/*
  Warnings:

  - The `zonesOfInterest` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `essentialFeatures` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "usageProperty" DROP NOT NULL,
ALTER COLUMN "referrer" DROP NOT NULL,
ALTER COLUMN "requirementStatus" DROP NOT NULL,
ALTER COLUMN "propertyOfInterest" DROP NOT NULL,
ALTER COLUMN "propertyLocation" DROP NOT NULL,
ALTER COLUMN "typeOfCapture" DROP NOT NULL,
ALTER COLUMN "aspiredPrice" DROP NOT NULL,
ALTER COLUMN "typeOfBusiness" DROP NOT NULL,
ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "isPotentialInvestor" DROP NOT NULL,
DROP COLUMN "zonesOfInterest",
ADD COLUMN     "zonesOfInterest" TEXT[],
DROP COLUMN "essentialFeatures",
ADD COLUMN     "essentialFeatures" TEXT[],
ALTER COLUMN "amountOfPeople" DROP NOT NULL,
ALTER COLUMN "amountOfPets" DROP NOT NULL,
ALTER COLUMN "amountOfYounger" DROP NOT NULL,
ALTER COLUMN "amountOfNights" DROP NOT NULL,
ALTER COLUMN "reasonOfStay" DROP NOT NULL,
ALTER COLUMN "usageOfProperty" DROP NOT NULL,
ALTER COLUMN "typeOfPerson" DROP NOT NULL,
ALTER COLUMN "personEntry" DROP NOT NULL,
ALTER COLUMN "personHeadquarters" DROP NOT NULL,
ALTER COLUMN "personLocation" DROP NOT NULL,
ALTER COLUMN "specificRequirement" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "remodeledAreas" DROP NOT NULL,
ALTER COLUMN "propertyDistribution" DROP NOT NULL,
ALTER COLUMN "m2" DROP NOT NULL,
ALTER COLUMN "occupation" DROP NOT NULL,
ALTER COLUMN "userFullName" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "serviceName" DROP NOT NULL,
ALTER COLUMN "serviceId" DROP NOT NULL,
ALTER COLUMN "subServiceName" DROP NOT NULL,
ALTER COLUMN "subServiceId" DROP NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;
