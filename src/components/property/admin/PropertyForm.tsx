'use client';
import { Property, Attribute, Equipment, Utility, Adjacency } from '@prisma/client';
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
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  addDocument,
  addImage,
  selectPropertyImages,
  updateLoadingState,
  wipeImagesAndDocuments,
} from '@/lib/store/features/files/state/filesSlice';
import { Button } from '@/components/ui/button';
import PreviewProperty from '@/components/property/admin/PreviewProperty';
import { createProperty } from '@/actions/property';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Props = {
  data: {
    property?: FullProperty;
    attributes: FilledAttribute[];
    equipments: Equipment[];
    utilities: Utility[];
    adjacencies: Adjacency[];
  };
};

export interface FilledAttribute extends Attribute {
  value: any;
}

export interface UtilityForm {
  id: string;
  utilityId: number;
  title: string;
  description?: string;
  additionalInformation?: string;
  value: boolean;
}

export interface AdjacencyForm {
  id: string;
  adjacencyId: number;
  title: string;
  description?: string;
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
  value: any;
}

interface FullProperty extends Property {
  negotiationInformation: {
    socialMedia?: boolean;
    ally?: string;
    client?: string;
    partOfPayment?: string;
    minimumNegotiation?: string;
    externalAdviser?: string;
    rentCommission?: string;
    reasonToSellOrRent?: string;
    price: string;
    realStateGroups?: boolean;
    ownerPaysCommission?: string;
    realStateWebPages?: boolean;
    mouthToMouth?: boolean;
    operationType: string;
    propertyExclusivity: string;
    publicationOnBuilding?: boolean;
    realStateAdviser?: string;
    sellCommission?: string;
  };
  generalInformation: {
    code: string;
    footageGround: string;
    footageBuilding: string;
    description: string;
    propertyType: string;
    propertyCondition?: string;
    handoverKeys?: boolean;
    termsAndConditionsAccepted?: boolean;
    antiquity?: string;
    zoning?: string;
    amountOfFloors?: string;
    publicationTitle: string;
    propertiesPerFloor?: string;
    typeOfWork?: string;
    isFurnished?: boolean;
    isOccupiedByPeople?: boolean;
  };
  documentsInformation: {
    owner?: string;
    successionDeclaration?: string;
    isCatastralRecordSameOwner?: boolean;
    attorneyEmail?: string;
    catastralRecordYear?: string;
    condominiumSolvency?: boolean;
    CIorRIF?: boolean;
    power?: string;
    attorneyFirstName?: string;
    attorneyPhone?: string;
    attorneyLastName?: string;
    courtRulings?: string;
    spouseCIorRIF?: boolean;
    ownerCIorRIF?: boolean;
    mainProperty?: boolean;
    condominiumSolvencyDetails?: string;
    mortgageRelease?: string;
    propertyDoc?: boolean;
  };
  locationInformation: {
    urbanization?: string;
    state: string;
    amountOfFloors?: string;
    trunkNumber?: string;
    location?: string;
    referencePoint?: string;
    nomenclature?: string;
    municipality?: string;
    parkingLevel?: string;
    buildingShoppingCenter?: string;
    avenue?: string;
    parkingNumber?: string;
    buildingNumber?: string;
    tower?: string;
    country: string;
    city: string;
    howToGet?: string;
    street?: string;
    floor?: string;
    trunkLevel?: string;
    isClosedStreet?: string;
  };
  AttributesOnProperties: {
    propertyId: string;
    attributeId: number;
    createdAt: Date;
    value: string;
    attribute: Attribute;
  }[];
  UtilitiesOnProperties: {
    propertyId: string;
    utilityId: number;
    createdAt: Date;
    additionalInformation: string;
    utility: Utility;
  }[];
  EquipmentsOnProperties: {
    propertyId: string;
    equipmentId: number;
    createdAt: Date;
    brand: string;
    equipment: Equipment;
    additionalInformation: string;
  }[];
  AdjacenciesOnProperties: {
    propertyId: string;
    adjacencyId: number;
    createdAt: Date;
    adjacency: Adjacency;
    additionalInformation: string;
  }[];
}

export const PropertyFormSchema = z.object({
  attributes: z.array(
    z
      .object({
        attributeId: z.number(),
        formType: z.string(),
        label: z.string(),
        placeholder: z.string().nullable(),
        value: z.any().optional(),
      })
      .optional(),
  ),
  equipments: z.array(
    z
      .object({
        equipmentId: z.number(),
        title: z.string(),
        brand: z.string().nullable().optional(),
        additionalInformation: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        value: z.any().optional(),
      })
      .optional(),
  ),
  utilities: z.array(
    z
      .object({
        utilityId: z.number(),
        title: z.string(),
        additionalInformation: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        value: z.any().optional(),
      })
      .optional(),
  ),
  adjacencies: z.array(
    z
      .object({
        adjacencyId: z.number(),
        title: z.string(),
        description: z.string().nullable().optional(),
        value: z.any().optional(),
      })
      .optional(),
  ),
  generalInformation: z.object({
    code: z.string(),
    footageGround: z.string({ required_error: 'Este campo es requerido' }),
    footageBuilding: z.string({ required_error: 'Este campo es requerido' }),
    description: z.string({ required_error: 'Este campo es requerido' }),
    propertyType: z.string({ required_error: 'Este campo es requerido' }),
    propertyCondition: z.string().optional(),
    handoverKeys: z.boolean().optional(),
    termsAndConditionsAccepted: z.boolean().optional(),
    antiquity: z.string().optional(),
    zoning: z.string().optional(),
    amountOfFloors: z.string().optional(),
    publicationTitle: z.string(),
    propertiesPerFloor: z.string().optional(),
    typeOfWork: z.string().optional(),
    isFurnished: z.boolean().optional(),
    isOccupiedByPeople: z.boolean().optional(),
  }),
  locationInformation: z.object({
    urbanization: z.string().optional(),
    state: z.string({ required_error: 'Este campo es requerido' }),
    amountOfFloors: z.string().optional(),
    trunkNumber: z.string().optional(),
    location: z.string().optional(),
    referencePoint: z.string().optional(),
    nomenclature: z.string().optional(),
    municipality: z.string().optional(),
    parkingLevel: z.string().optional(),
    buildingShoppingCenter: z.string().optional(),
    avenue: z.string().optional(),
    parkingNumber: z.string().optional(),
    buildingNumber: z.string().optional(),
    tower: z.string().optional(),
    country: z.string({ required_error: 'Este campo es requerido' }),
    city: z.string({ required_error: 'Este campo es requerido' }),
    howToGet: z.string().optional(),
    street: z.string().optional(),
    floor: z.string().optional(),
    trunkLevel: z.string().optional(),
    isClosedStreet: z.string().optional(),
  }),
  negotiationInformation: z.object({
    socialMedia: z.boolean().optional(),
    ally: z.string().optional().nullable(),
    client: z.string().optional(),
    partOfPayment: z.string().optional(),
    minimumNegotiation: z.string().optional(),
    externalAdviser: z.string().optional().nullable(),
    rentCommission: z.string().optional(),
    reasonToSellOrRent: z.string().optional(),
    price: z.string({ required_error: 'Este campo es requerido' }),
    realStateGroups: z.boolean().optional(),
    ownerPaysCommission: z.string().optional(),
    realStateWebPages: z.boolean().optional(),
    mouthToMouth: z.boolean().optional(),
    operationType: z.string({ required_error: 'Este campo es requerido' }),
    propertyExclusivity: z.string({ required_error: 'Este campo es requerido' }),
    publicationOnBuilding: z.boolean().optional(),
    realStateAdviser: z.string().optional(),
    sellCommission: z.string().optional(),
  }),
  documentsInformation: z.object({
    owner: z.string().optional().nullable(),
    successionDeclaration: z.string().optional(),
    isCatastralRecordSameOwner: z.boolean().optional(),
    attorneyEmail: z.string().optional(),
    catastralRecordYear: z.string().optional(),
    condominiumSolvency: z.boolean().optional(),
    CIorRIF: z.boolean().optional(),
    power: z.string().optional(),
    attorneyFirstName: z.string().optional(),
    attorneyPhone: z.string().optional(),
    attorneyLastName: z.string().optional(),
    courtRulings: z.string().optional(),
    spouseCIorRIF: z.boolean().optional(),
    ownerCIorRIF: z.boolean().optional(),
    mainProperty: z.boolean().optional(),
    condominiumSolvencyDetails: z.string().optional(),
    mortgageRelease: z.string().optional(),
    propertyDoc: z.boolean().optional(),
  }),
});

const options = [
  'General',
  'Ubicacion',
  'Atributos',
  'Visuales',
  'Distribucion, Equipos y Servicios',
  'Negociacion',
  'Documentos',
  'Vista previa',
];

export default function PropertyForm({ data: { property, attributes, equipments, adjacencies, utilities } }: Props) {
  const [section, setSection] = useState<string>('General');
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectPropertyImages);
  const router = useRouter();

  const form = useForm<z.infer<typeof PropertyFormSchema>>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: {
      generalInformation: {
        publicationTitle: 'Oferta de casa en las quintas',
        description:
          '¡Tu hogar ideal te espera! Esta espaciosa casa de [Metros cuadrados] m², ubicada en el corazón de [Barrio], es perfecta para familias que buscan comodidad y tranquilidad. Con amplios espacios llenos de luz natural, un jardín cuidado y una distribución funcional, podrás disfrutar de momentos inolvidables junto a tus seres queridos. Imagina las tardes de barbecue en el patio, los juegos de los niños en el jardín y las reuniones familiares en el acogedor living.',
        propertyType: 'Casa',
        footageGround: '120',
        footageBuilding: '100',
      },
      locationInformation: {
        country: 'Venezuela',
        city: 'Valencia',
        state: 'Carabobo',
        municipality: 'Naguanagua',
      },
      negotiationInformation: {
        price: '45,000',
        operationType: 'Venta',
        propertyExclusivity: '15 dias',
      },
    },
  });
  const { append: appendAttribute } = useFieldArray({ control: form.control, name: 'attributes' });
  const { append: appendEquipment } = useFieldArray({ control: form.control, name: 'equipments' });
  const { append: appendUtility } = useFieldArray({ control: form.control, name: 'utilities' });
  const { append: appendAdjacency } = useFieldArray({ control: form.control, name: 'adjacencies' });

  if (property) {
    form.setValue('generalInformation', property.generalInformation);
    form.setValue('locationInformation', property.locationInformation);
    form.setValue('negotiationInformation', property.negotiationInformation);
    form.setValue('documentsInformation', property.documentsInformation);
  }

  useEffect(() => {
    dispatch(wipeImagesAndDocuments());
    if (!property) {
      setNewVinmId();
    } else {
      getImagesFromStorage(property.generalInformation.code);
      getDocumentsFromStorage(property.generalInformation.code);
    }

    appendAttributes();
    appendEquipments();
    appendUtilities();
    appendAdjacencies();
    console.log(attributes);
  }, []);

  async function onSubmit(values: z.infer<typeof PropertyFormSchema>) {
    const { success, error } = await createProperty(values, images);
    if (success) {
      toast.success('Se registro el inmueble con exito!');
      router.back();
    } else {
      toast.error(`Ocurrio un error al intentar registrar el inmueble: ${error}`);
      console.log(error);
    }
  }

  async function setNewVinmId() {
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
      appendAttribute({ ...item, attributeId: item.id, value: item.formType === 'check' ? Boolean(item.value) : item.value });
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

  function appendAdjacencies() {
    adjacencies.forEach((item) => {
      appendAdjacency({ ...item, adjacencyId: item.id, value: false });
    });
  }

  function handleStep(action: 'next' | 'prev') {
    const length = options.length;
    const index = options.indexOf(section);
    console.log(form.getValues());
    if (action === 'prev') {
      if (index === 0) return;
      setSection(options[index - 1]);
    } else {
      if (index === length - 1) return;
      setSection(options[index + 1]);
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-end w-full">
        <div className="w-full lg:w-[200px] border-b-2 border-gray-200 lg:border-none pb-5">
          <p className="font-bold text-sm mb-1">Estas viendo</p>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger className="">
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
          {section === 'General' && <GeneralInformationComponent />}
          {section === 'Ubicacion' && <LocationInformationComponent />}
          {section === 'Atributos' && <AttributesInformation />}
          {section === 'Visuales' && <VisualsInformation />}
          {section === 'Distribucion, Equipos y Servicios' && <DistributionAndEquipmentInformation />}
          {section === 'Negociacion' && <NegotiationInformationComponent />}
          {section === 'Documentos' && <DocumentsInformationComponent />}
          {section === 'Vista previa' && <PreviewProperty />}

          <div className="flex justify-center gap-3 mt-10">
            {section === 'Vista previa' && (
              <Button type="submit" className="w-full lg:w-auto bg-red-900">
                Guardar cambios
              </Button>
            )}
            {section !== 'Vista previa' && (
              <>
                <Button
                  type="button"
                  disabled={section === 'General'}
                  className="w-full lg:w-auto"
                  variant="outline"
                  onClick={() => handleStep('prev')}
                >
                  Anterior
                </Button>
                <Button type="button" className="w-full lg:w-auto bg-red-900" onClick={() => handleStep('next')}>
                  Siguiente
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
