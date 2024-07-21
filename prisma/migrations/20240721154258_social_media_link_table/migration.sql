-- CreateTable
CREATE TABLE "SocialMediaLink" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "iconName" TEXT NOT NULL,

    CONSTRAINT "SocialMediaLink_pkey" PRIMARY KEY ("id")
);
