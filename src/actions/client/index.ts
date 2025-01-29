'use server';

import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { ClientFormSchema } from '@/lib/interfaces/Client';

export async function createClient(form: z.infer<typeof ClientFormSchema>): Promise<{ success: boolean; error?: string }> {
  console.log(form);
  try {
    await prisma.client.create({
      data: {
        occupation: form.occupation ?? '',
        adviser_id: form.adviser_id ?? '',
        adviser_name: form.adviser_name ?? '',
        essentialFeatures: form.essentialFeatures ?? [],
        m2: form.m2 ?? '',
        propertytype: form.propertytype ?? '',
        allowyounger: form.allowyounger ?? '',
        allowpets: form.allowpets ?? '',
        amountOfNights: form.amountOfNights ?? 0,
        amountOfPets: form.amountOfPets ?? 0,
        amountOfPeople: form.amountOfPeople ?? 0,
        amountOfYounger: form.amountOfYounger ?? 0,
        budgetfrom: form.budgetfrom ?? 0,
        budgetto: form.budgetto ?? 0,
        name: form.name,
        company: form.company ?? '',
        arrivingDate: form.arrivingDate ?? null,
        note: form.note ?? '',
        appointmentDate: form.appointmentDate ?? null,
        checkoutDate: form.checkoutDate ?? null,
        aspiredPrice: form.aspiredPrice ?? '',
        contactFrom: form.contactFrom,
        inspectionDate: form.inspectionDate ?? null,
        interestDate: form.interestDate ?? null,
        isPotentialInvestor: form.isPotentialInvestor ?? false,
        status: form.status ?? true,
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
        adviser_id: form.adviser_id ?? '',
        adviser_name: form.adviser_name ?? '',
        essentialFeatures: form.essentialFeatures ?? [],
        m2: form.m2 ?? '',
        amountOfNights: form.amountOfNights ?? 0,
        amountOfPets: form.amountOfPets ?? 0,
        amountOfPeople: form.amountOfPeople ?? 0,
        amountOfYounger: form.amountOfYounger ?? 0,
        budgetfrom: form.budgetfrom ?? 0,
        budgetto: form.budgetto ?? 0,
        name: form.name,
        company: form.company ?? '',
        arrivingDate: form.arrivingDate ?? null,
        note: form.note ?? '',
        appointmentDate: form.appointmentDate ?? null,
        checkoutDate: form.checkoutDate ?? null,
        aspiredPrice: form.aspiredPrice ?? '',
        contactFrom: form.contactFrom,
        inspectionDate: form.inspectionDate ?? null,
        interestDate: form.interestDate ?? null,
        isPotentialInvestor: form.isPotentialInvestor ?? false,
        status: form.status ?? true,
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

export async function activateDeactivateClient(id: number, current: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.client.update({
      data: {
        status: !current,
      },
      where: { id },
    });

    return {
      success: true,
      error: undefined,
    };
  } catch (err) {
    console.log(err);
    return { success: false, error: JSON.stringify(err) };
  }
}
