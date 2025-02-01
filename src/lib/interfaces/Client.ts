import { z } from 'zod';

export const ClientFormSchema = z.object({
  id: z.number().optional(),
  name: z.string({ required_error: 'Este campo es requerido' }).min(3, 'Minimo 3 caracteres'),
  referrer: z.string().optional().nullable(),
  adviser_id: z.string().optional().nullable(),
  adviser_name: z.string().optional().nullable(),
  usageProperty: z.string().optional().nullable(),
  requirementStatus: z.string().optional().nullable(),
  contactFrom: z.string(),
  allowyounger: z.string().optional(),
  allowpets: z.string().optional(),
  requestracking: z.string().optional().nullable(),
  budgetfrom: z.any(),
  budgetto: z.any(),
  isinwaitinglist: z.boolean().optional().nullable(),
  status: z.string().default('Activo'),
  propertytype: z.string().optional(),
  propertyOfInterest: z.string().optional().nullable(),
  propertyLocation: z.string().optional().nullable(),
  typeOfCapture: z.string().optional().nullable(),
  aspiredPrice: z.string().optional().nullable(),
  typeOfBusiness: z.string().optional().nullable(),
  zonesOfInterest: z.array(z.string()).optional().nullable(),
  essentialFeatures: z.array(z.string()).optional().nullable(),
  amountOfPeople: z.number().optional().nullable(),
  amountOfPets: z.any().optional().nullable(),
  amountOfYounger: z.any().optional().nullable(),
  amountOfNights: z.number().optional().nullable(),
  arrivingDate: z.string().optional().nullable(),
  checkoutDate: z.string().optional().nullable(),
  interestDate: z.string().optional().nullable(),
  appointmentDate: z.string().optional().nullable(),
  inspectionDate: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  reasonOfStay: z.string().optional().nullable(),
  usageOfProperty: z.string().optional().nullable(),
  typeOfPerson: z.string().optional().nullable(),
  personEntry: z.string().optional().nullable(),
  personHeadquarters: z.string().optional().nullable(),
  personLocation: z.string().optional().nullable(),
  specificRequirement: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  remodeledAreas: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  m2: z.string().optional().nullable(),
  occupation: z.string().optional().nullable(),
  userFullName: z.string().optional().nullable(),
  userId: z.string().optional().nullable(),
  serviceName: z.string().optional().nullable(),
  serviceId: z.string().optional().nullable(),
  subServiceName: z.string().optional().nullable(),
  subServiceId: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  propertyDistribution: z.string().optional().nullable(),
  phone: z.string().min(9),
  isPotentialInvestor: z.boolean().optional().nullable(),
});
