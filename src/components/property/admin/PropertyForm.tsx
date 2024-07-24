'use client';
import {
  NegotiationInfomation,
  Property,
  GeneralInformation,
  DocumentsInformation,
  LocationInformation,
  Attribute,
  Equipment,
  Utility,
} from '@prisma/client';
import {
  AttributesInformation,
  DistributionAndEquipmentInformation,
  DocumentsInformation as DocumentsInformationComponent,
  GeneralInformation as GeneralInformationComponent,
  LocationInformation as LocationInformationComponent,
  NegotiationInformation as NegotiationInformationComponent,
  VisualsInformation,
} from '@/components/property/admin';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { getDownloadURL, listAll, ref } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import { useAppDispatch } from '@/lib/store/hooks';
import { addDocument, addImage, updateLoadingState, wipeImagesAndDocuments } from '@/lib/store/features/files/state/filesSlice';

type Props = {
  data?: FullProperty;
  essentials: {
    attributes: Attribute[];
    equipments: Equipment[];
    utilities: Utility[];
  };
};

export interface UtilityForm {
  id: string;
  utilityId: number;
  title: string;
  description?: string;
  additionalInformation?: string;
  value: boolean;
}

export interface EquipmentForm {
  id: string;
  equipmentId: number;
  title: string;
  description?: string;
  brand?: string;
  additionalInformation?: string;
  value: boolean;
}

export interface AttributeForm {
  formType: string;
  id: string;
  attributeId: number;
  options?: string;
  placeholder?: string;
  label: string;
  valueType: string;
  value: any;
}

interface FullProperty extends Property {
  negotiationInformation: NegotiationInfomation;
  generalInformation: GeneralInformation;
  documentsInformation: DocumentsInformation;
  locationInformation: LocationInformation;
}

const formSchema = z.object({
  attributes: z.array(
    z.object({
      attributeId: z.number(),
      formType: z.string(),
      label: z.string(),
      placeholder: z.string().nullable(),
      value: z.any().optional(),
    }),
  ),
  equipments: z.array(
    z.object({
      equipmentId: z.number(),
      title: z.string(),
      brand: z.string().nullable().optional(),
      additionalInformation: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      value: z.any().optional(),
    }),
  ),
  utilities: z.array(
    z.object({
      utilityId: z.number(),
      title: z.string(),
      additionalInformation: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      value: z.any().optional(),
    }),
  ),
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

const options = ['General', 'Ubicacion', 'Atributos', 'Visuales', 'Distribucion, Equipos y Servicios', 'Negociacion', 'Documentos'];

export default function PropertyForm({ data, essentials: { utilities, attributes, equipments } }: Props) {
  const [section, setSection] = useState<string>('General');
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { append: appendAttribute } = useFieldArray({ control: form.control, name: 'attributes' });
  const { append: appendEquipment } = useFieldArray({ control: form.control, name: 'equipments' });
  const { append: appendUtility } = useFieldArray({ control: form.control, name: 'utilities' });

  if (data) {
    form.setValue('generalInformation', data.generalInformation);
    form.setValue('locationInformation', data.locationInformation);
    form.setValue('negotiationInformation', data.negotiationInformation);
  }

  useEffect(() => {
    dispatch(wipeImagesAndDocuments());
    if (!data) {
      setNewVinmId();
      appendAttributes();
      appendEquipments();
      appendUtilities();
    } else {
      getImagesFromStorage(data.generalInformation.code);
      getDocumentsFromStorage(data.generalInformation.code);
    }
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the admin values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  async function setNewVinmId() {
    console.log(process.env.NEXT_PUBLIC_HOST_URL);
    const { id } = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/inmuebles/getNewCodeId`, {
      method: 'GET',
    }).then((res) => res.json());
    form.setValue('generalInformation.code', id);
    await getImagesFromStorage(id);
    await getDocumentsFromStorage(id);
  }

  async function getImagesFromStorage(propertyCode: string) {
    try {
      dispatch(updateLoadingState({ status: true, text: 'Cargando imagenes...', type: 'images' }));
      const path = `Servicio Inmobiliario/inmuebles/${propertyCode}/imagenes`;
      const { items } = await listAll(ref(storage, path));
      for (const item of items) {
        const imageRef = ref(storage, item.fullPath);
        const downloadUrl = await getDownloadURL(imageRef);
        dispatch(addImage(downloadUrl));
      }
      dispatch(updateLoadingState({ type: 'images', status: false, text: '' }));
    } catch (err) {
      console.log(err);
      dispatch(updateLoadingState({ type: 'images', status: false, text: '' }));
    }
  }
  async function getDocumentsFromStorage(propertyCode: string) {
    try {
      dispatch(updateLoadingState({ status: true, text: 'Cargando documentos...', type: 'documents' }));
      const path = `Servicio Inmobiliario/inmuebles/${propertyCode}/documentos`;
      const { items } = await listAll(ref(storage, path));
      for (const item of items) {
        const documentRef = ref(storage, item.fullPath);
        dispatch(addDocument({ name: documentRef.name, fullPath: documentRef.fullPath }));
      }
      dispatch(updateLoadingState({ type: 'documents', status: false, text: '' }));
    } catch (err) {
      console.log(err);
      dispatch(updateLoadingState({ type: 'documents', status: false, text: '' }));
    }
  }

  function appendAttributes() {
    attributes.forEach((item) => {
      appendAttribute({ ...item, attributeId: item.id, value: item.formType === 'check' ? false : '' });
    });
  }

  function appendEquipments() {
    equipments.forEach((item) => {
      appendEquipment({ ...item, equipmentId: item.id, value: false, additionalInformation: '', brand: '' });
    });
  }

  function appendUtilities() {
    utilities.forEach((item) => {
      appendUtility({ ...item, utilityId: item.id, value: false });
    });
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
          {section === 'Distribucion, Equipos y Servicios' && <DistributionAndEquipmentInformation />}
          {section === 'Negociacion' && <NegotiationInformationComponent />}
        </form>
      </Form>
    </div>
  );
}
