-- CreateTable
CREATE TABLE "ContactForm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "ContactForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkWithUsForm" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "cvUrl" TEXT NOT NULL,

    CONSTRAINT "WorkWithUsForm_pkey" PRIMARY KEY ("id")
);
