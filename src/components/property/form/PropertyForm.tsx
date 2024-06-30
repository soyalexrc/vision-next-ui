'use client';
import { NegotiationInfomation, Property, GeneralInformation, DocumentsInformation, LocationInformation, File as PropertyFile } from '@prisma/client';
import AttributesInformation from '@/components/property/form/AttributesInformation';
import DistributionAndEquipmentInformation from "@/components/property/form/DistributionAndEquipmentInformation'";
import DocumentsInformationComponent from '@/components/property/form/DocumentsInformation';
import GeneralInformationComponent from '@/components/property/form/GeneralInformation';
import LocationInformationComponent from '@/components/property/form/LocationInformation';
import NegotiationInformation from '@/components/property/form/NegotiationInformation';
import React, { useState } from 'react';
import VisualsInformation from '@/components/property/form/VisualsInformation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

type Props = {
  data: FullProperty;
};

interface FullProperty extends Property {
  negotiationInformation: NegotiationInfomation;
  generalInformation: GeneralInformation;
  documentsInformation: DocumentsInformation;
  locationInformation: LocationInformation;
  files: PropertyFile[];
}

const formSchema = z.object({
  generalInformation: z.object({
    status: z.string(),
    code: z.string(),
    footageGround: z.string(),
    footageBuilding: z.string(),
    description: z.string(),
    propertyType: z.string(),
    propertyCondition: z.string(),
    handoverKeys: z.boolean(),
    termsAndConditionsAccepted: z.boolean(),
    antiquity: z.string(),
    zoning: z.string(),
    amountOfFloors: z.string(),
    publicationTitle: z.string(),
    propertiesPerFloor: z.string(),
    typeOfWork: z.string(),
    isFurnished: z.boolean(),
    isOccupiedByPeople: z.boolean(),
  }),
  locationInformation: z.object({
    urbanization: z.string(),
    state: z.string(),
    amountOfFloors: z.string(),
    trunkNumber: z.string(),
    location: z.string(),
    referencePoint: z.string(),
    nomenclature: z.string(),
    municipality: z.string(),
    parkingLevel: z.string(),
    buildingShoppingCenter: z.string(),
    avenue: z.string(),
    parkingNumber: z.string(),
    buildingNumber: z.string(),
    tower: z.string(),
    country: z.string(),
    city: z.string(),
    howToGet: z.string(),
    street: z.string(),
    floor: z.string(),
    trunkLevel: z.string(),
    isClosedStreet: z.string(),
  }),
});

const options = ['General', 'Ubicacion', 'Visuales', 'Distribucion y Equipos', 'Negociacion', 'Atributos', 'Documentos'];

export default function PropertyForm({ data }: Props) {
  const [section, setSection] = useState<string>('General');

  const {
    images,
    attributes,
    distribution,
    equipment,
    documentsInformation,
    locationInformation,
    generalInformation,
    negotiationInformation,
  } = data;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  form.setValue('generalInformation', generalInformation);
  form.setValue('locationInformation', locationInformation);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <div>
          <p className="font-bold text-sm mb-1">Estas viendo</p>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seccion de propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
          {section === 'Atributos' && <AttributesInformation data={attributes} />}
          {section === 'Distribucion y Equipos' && (
            <DistributionAndEquipmentInformation equipment={equipment} distribution={distribution} />
          )}
          {section === 'Documentos' && <DocumentsInformationComponent />}
          {section === 'General' && <GeneralInformationComponent />}
          {section === 'Ubicacion' && <LocationInformationComponent />}
          {section === 'Visuales' && <VisualsInformation />}
          {section === 'Negociacion' && <NegotiationInformation data={negotiationInformation} />}
        </form>
      </Form>
    </div>
  );
}
