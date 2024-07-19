'use client';
import { NegotiationInfomation, Property, GeneralInformation, DocumentsInformation, LocationInformation } from '@prisma/client';
import {
  AttributesInformation,
  DistributionAndEquipmentInformation,
  DocumentsInformation as DocumentsInformationComponent,
  GeneralInformation as GeneralInformationComponent,
  LocationInformation as LocationInformationComponent,
  NegotiationInformation as NegotiationInformationComponent,
  VisualsInformation,
} from '@/components/property/admin';
import React, { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';

type Props = {
  data?: FullProperty;
};

interface FullProperty extends Property {
  negotiationInformation: NegotiationInfomation;
  generalInformation: GeneralInformation;
  documentsInformation: DocumentsInformation;
  locationInformation: LocationInformation;
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
  negotiationInformation: z.object({
    socialMedia: z.boolean(),
    ally: z.string().optional().nullable(),
    client: z.string().optional(),
    partOfPayment: z.string(),
    minimumNegotiation: z.string(),
    externalAdviser: z.string().optional().nullable(),
    rentCommission: z.string(),
    reasonToSellOrRent: z.string(),
    price: z.string(),
    realStateGroups: z.boolean(),
    ownerPaysCommission: z.string(),
    realStateWebPages: z.boolean(),
    mouthToMouth: z.boolean(),
    operationType: z.string(),
    propertyExclusivity: z.string(),
    publicationOnBuilding: z.boolean(),
    realStateAdviser: z.string(),
    sellCommission: z.string(),
  }),
  documentsInformation: z.object({
    owner: z.string().optional().nullable(),
    successionDeclaration: z.string(),
    isCatastralRecordSameOwner: z.boolean(),
    attorneyEmail: z.string(),
    catastralRecordYear: z.string(),
    condominiumSolvency: z.boolean(),
    CIorRIF: z.boolean(),
    power: z.string(),
    attorneyFirstName: z.string(),
    attorneyPhone: z.string(),
    attorneyLastName: z.string(),
    courtRulings: z.string(),
    spouseCIorRIF: z.boolean(),
    ownerCIorRIF: z.boolean(),
    mainProperty: z.boolean(),
    condominiumSolvencyDetails: z.string(),
    mortgageRelease: z.string(),
    propertyDoc: z.boolean(),
  }),
});

const options = ['General', 'Ubicacion', 'Visuales', 'Distribucion y Equipos', 'Negociacion', 'Atributos', 'Documentos'];

export default function PropertyForm({ data }: Props) {
  const [section, setSection] = useState<string>('General');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  if (data) {
    form.setValue('generalInformation', data.generalInformation);
    form.setValue('locationInformation', data.locationInformation);
    form.setValue('negotiationInformation', data.negotiationInformation);
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the admin values.
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
          {section === 'Atributos' && <AttributesInformation />}
          {section === 'Documentos' && <DocumentsInformationComponent />}
          {section === 'General' && <GeneralInformationComponent />}
          {section === 'Ubicacion' && <LocationInformationComponent />}
          {section === 'Visuales' && <VisualsInformation />}
          {section === 'Distribucion y Equipos' && <DistributionAndEquipmentInformation />}
          {section === 'Negociacion' && <NegotiationInformationComponent />}
        </form>
      </Form>
    </div>
  );
}
