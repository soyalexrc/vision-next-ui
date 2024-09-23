-- CreateTable
CREATE TABLE "CashFlow" (
    "id" SERIAL NOT NULL,
    "client" TEXT,
    "userName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "owner" TEXT,
    "location" TEXT,
    "person" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "wayToPay" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "serviceType" TEXT,
    "taxPayer" TEXT,
    "canon" TEXT,
    "guarantee" TEXT,
    "contract" TEXT,
    "reason" TEXT,
    "createdBy" TEXT NOT NULL,
    "isTemporalTransaction" BOOLEAN,
    "temporalTransactionId" INTEGER,
    "amount" INTEGER,
    "totalDue" INTEGER,
    "incomeByThird" INTEGER,
    "attachments" INTEGER,
    "pendingToCollect" INTEGER,
    "cashFlowPropertyId" INTEGER NOT NULL,

    CONSTRAINT "CashFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowProperty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locatiuon" TEXT NOT NULL,

    CONSTRAINT "CashFlowProperty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalPerson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "ExternalPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowWayToPay" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CashFlowWayToPay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowCurrency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "CashFlowCurrency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowSourceEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CashFlowSourceEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashFlowTransactionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CashFlowTransactionType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_cashFlowPropertyId_fkey" FOREIGN KEY ("cashFlowPropertyId") REFERENCES "CashFlowProperty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
