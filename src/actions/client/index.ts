'use server';

import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { ClientFormSchema } from '@/lib/interfaces/Client';

export async function createClient(form: z.infer<typeof ClientFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.client.create({
      data: {
        occupation: form.occupation ?? '',
        essentialFeatures: form.essentialFeatures ?? [],
        m2: form.m2 ?? '',
        amountOfNights: form.amountOfNights ?? 0,
        amountOfPets: form.amountOfPets ?? 0,
        name: form.name,
        amountOfPeople: form.amountOfPeople ?? 0,
        company: form.company ?? '',
        amountOfYounger: form.amountOfYounger ?? 0,
        arrivingDate: form.arrivingDate ?? null,
        note: form.note ?? '',
        appointmentDate: form.appointmentDate ?? null,
        checkoutDate: form.checkoutDate ?? null,
        aspiredPrice: form.aspiredPrice ?? '',
        contactFrom: form.contactFrom,
        inspectionDate: form.inspectionDate ?? null,
        interestDate: form.interestDate ?? null,
        isPotentialInvestor: form.isPotentialInvestor ?? false,
        phone: form.phone,
        location: form.location ?? '',
        personEntry: form.personEntry ?? '',
        serviceId: form.serviceId ?? null,
        subServiceId: form.subServiceId ?? null,
        username: form.username ?? '',
        personHeadquarters: form.personHeadquarters ?? '',
        userId: form.userId ?? '',
        propertyDistribution: form.propertyDistribution ?? '',
        personLocation: form.personLocation ?? '',
        referrer: form.referrer ?? '',
        propertyLocation: form.propertyLocation ?? '',
        propertyOfInterest: form.propertyOfInterest ?? '',
        reasonOfStay: form.reasonOfStay ?? '',
        requirementStatus: form.requirementStatus ?? '',
        serviceName: form.serviceName,
        typeOfCapture: form.typeOfCapture ?? '',
        specificRequirement: form.specificRequirement ?? '',
        remodeledAreas: form.remodeledAreas ?? '',
        subServiceName: form.subServiceName ?? '',
        typeOfBusiness: form.typeOfBusiness ?? '',
        typeOfPerson: form.typeOfPerson ?? '',
        usageOfProperty: form.usageOfProperty ?? '',
        usageProperty: form.usageProperty ?? '',
        userFullName: form.userFullName ?? '',
        zonesOfInterest: form.zonesOfInterest ?? [],
      },
    });
    return { success: true, error: '' };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}

export async function updateClient(form: z.infer<typeof ClientFormSchema>): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.client.update({
      where: {
        id: form.id,
      },
      data: {
        occupation: form.occupation ?? '',
        essentialFeatures: form.essentialFeatures ?? [],
        m2: form.m2 ?? '',
        amountOfNights: form.amountOfNights ?? 0,
        amountOfPets: form.amountOfPets ?? 0,
        name: form.name,
        amountOfPeople: form.amountOfPeople ?? 0,
        company: form.company ?? '',
        amountOfYounger: form.amountOfYounger ?? 0,
        arrivingDate: form.arrivingDate ?? null,
        note: form.note ?? '',
        appointmentDate: form.appointmentDate ?? null,
        checkoutDate: form.checkoutDate ?? null,
        aspiredPrice: form.aspiredPrice ?? '',
        contactFrom: form.contactFrom,
        inspectionDate: form.inspectionDate ?? null,
        interestDate: form.interestDate ?? null,
        isPotentialInvestor: form.isPotentialInvestor ?? false,
        phone: form.phone,
        location: form.location ?? '',
        personEntry: form.personEntry ?? '',
        serviceId: form.serviceId ?? null,
        subServiceId: form.subServiceId ?? null,
        username: form.username ?? '',
        personHeadquarters: form.personHeadquarters ?? '',
        userId: form.userId ?? '',
        propertyDistribution: form.propertyDistribution ?? '',
        personLocation: form.personLocation ?? '',
        referrer: form.referrer ?? '',
        propertyLocation: form.propertyLocation ?? '',
        propertyOfInterest: form.propertyOfInterest ?? '',
        reasonOfStay: form.reasonOfStay ?? '',
        requirementStatus: form.requirementStatus ?? '',
        serviceName: form.serviceName,
        typeOfCapture: form.typeOfCapture ?? '',
        specificRequirement: form.specificRequirement ?? '',
        remodeledAreas: form.remodeledAreas ?? '',
        subServiceName: form.subServiceName ?? '',
        typeOfBusiness: form.typeOfBusiness ?? '',
        typeOfPerson: form.typeOfPerson ?? '',
        usageOfProperty: form.usageOfProperty ?? '',
        usageProperty: form.usageProperty ?? '',
        userFullName: form.userFullName ?? '',
        zonesOfInterest: form.zonesOfInterest ?? [],
      },
    });
    return { success: true, error: '' };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}

export async function deleteClient(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.client.delete({
      where: {
        id,
      },
    });
    return { success: true, error: '' };
  } catch (error) {
    return {
      success: false,
      error: JSON.stringify(error),
    };
  }
}
