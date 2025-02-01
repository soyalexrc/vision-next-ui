import { Adjacency, Attribute, Distribution, Equipment, Property, Utility } from '@prisma/client';
import { z } from 'zod';

export interface FilledAttribute extends Attribute {
  value: any;
}

export interface FilledUtility extends Utility {
  value: any;
  additionalInformation?: string;
}

export interface FilledEquipment extends Utility {
  value: any;
  additionalInformation?: string;
  brand?: string;
}

export interface FilledAdjacency extends Adjacency {
  value: any;
}

export interface FilledDistribution extends Distribution {
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

export interface DistributionForm {
  id: string;
  distributionId: number;
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

export interface FullProperty extends Property {
  negotiationInformation: {
    id?: string;
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
    id?: string;
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
    id?: string;
    owner?: string;
    successionDeclaration?: string;
    isCatastralRecordSameOwner?: boolean;
    attorneyEmail?: string;
    catastralRecordYear?: string;
    realStateTax?: string;
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
    id?: string;
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
        utilityId: z.number().optional(),
        title: z.string().optional(),
        additionalInformation: z.string().nullable().optional(),
        description: z.string().nullable().optional(),
        value: z.any().optional(),
      })
      .optional(),
  ),
  distributions: z.array(
    z
      .object({
        distributionId: z.number(),
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
    id: z.string().optional(),
    footageGround: z.string().optional(),
    footageBuilding: z.string().optional(),
    description: z.string({ required_error: 'Este campo es requerido' }),
    propertyType: z.string({ required_error: 'Este campo es requerido' }),
    propertyCondition: z.string().optional(),
    handoverKeys: z.boolean().optional(),
    termsAndConditionsAccepted: z.boolean().optional(),
    antiquity: z.string().optional(),
    zoning: z.string().optional(),
    amountOfFloors: z.string().optional(),
    publicationTitle: z.string({ required_error: 'Este campo es requerido' }),
    propertiesPerFloor: z.string().optional(),
    typeOfWork: z.string().optional(),
    isFurnished: z.boolean().optional(),
    isOccupiedByPeople: z.boolean().optional(),
  }),
  locationInformation: z.object({
    id: z.string().optional(),
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
    city: z.string().optional(),
    howToGet: z.string().optional(),
    street: z.string().optional(),
    floor: z.string().optional(),
    trunkLevel: z.string().optional(),
    isClosedStreet: z.string().optional(),
  }),
  negotiationInformation: z.object({
    id: z.string().optional(),
    socialMedia: z.boolean().optional(),
    ally: z.string().optional().nullable(),
    client: z.string().optional(),
    partOfPayment: z.string().optional(),
    minimumNegotiation: z.string().optional(),
    externalAdviser: z.string().optional().nullable(),
    rentCommission: z.string().optional(),
    reasonToSellOrRent: z.string().optional(),
    price: z.string({ required_error: 'Este campo es requerido' }),
    additional_price: z.string().optional(),
    realStateGroups: z.boolean().optional(),
    ownerPaysCommission: z.string().optional(),
    realStateWebPages: z.boolean().optional(),
    mouthToMouth: z.boolean().optional(),
    operationType: z.string({ required_error: 'Este campo es requerido' }),
    propertyExclusivity: z.string().optional(),
    publicationOnBuilding: z.boolean().optional(),
    realStateAdviser: z.string().optional(),
    sellCommission: z.string().optional(),
  }),
  documentsInformation: z.object({
    id: z.string().optional(),
    owner: z.string().optional().nullable(),
    successionDeclaration: z.string().optional(),
    isCatastralRecordSameOwner: z.boolean().optional(),
    attorneyEmail: z.string().optional(),
    catastralRecordYear: z.string().optional(),
    realStateTax: z.string().optional(),
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

export type FormSection =
  | 'General'
  | 'Ubicacion'
  | 'Atributos y Distribucion'
  | 'Visuales'
  | 'Equipos y Servicios'
  | 'Negociacion'
  | 'Documentos'
  | 'Vista previa';

export const FormSectionOptions: FormSection[] = [
  'General',
  'Ubicacion',
  'Atributos y Distribucion',
  'Visuales',
  'Equipos y Servicios',
  'Negociacion',
  'Documentos',
  'Vista previa',
];
