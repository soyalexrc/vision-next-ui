-- CreateTable
CREATE TABLE "_PropertyToUtility" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EquipmentToProperty" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToUtility_AB_unique" ON "_PropertyToUtility"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToUtility_B_index" ON "_PropertyToUtility"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToProperty_AB_unique" ON "_EquipmentToProperty"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToProperty_B_index" ON "_EquipmentToProperty"("B");

-- AddForeignKey
ALTER TABLE "_PropertyToUtility" ADD CONSTRAINT "_PropertyToUtility_A_fkey" FOREIGN KEY ("A") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToUtility" ADD CONSTRAINT "_PropertyToUtility_B_fkey" FOREIGN KEY ("B") REFERENCES "Utility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToProperty" ADD CONSTRAINT "_EquipmentToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToProperty" ADD CONSTRAINT "_EquipmentToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
