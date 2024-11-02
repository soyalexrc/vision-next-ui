'use client';
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
import { createUpdateProperty } from '@/actions/property';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  FilledAdjacency,
  FilledAttribute,
  FilledDistribution,
  FilledEquipment,
  FilledUtility,
  FormSection,
  FormSectionOptions,
  FullProperty,
  PropertyFormSchema,
} from '@/lib/interfaces/property/PropertyForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Props = {
  data: {
    property?: FullProperty;
    attributes: FilledAttribute[];
    equipments: FilledEquipment[];
    distributions: FilledDistribution[];
    utilities: FilledUtility[];
    adjacencies: FilledAdjacency[];
  };
};

export default function PropertyForm({ data: { property, attributes, equipments, adjacencies, utilities, distributions } }: Props) {
  const [section, setSection] = useState<FormSection>('General');
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectPropertyImages);
  const router = useRouter();

  const form = useForm<z.infer<typeof PropertyFormSchema>>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: property
      ? {
          generalInformation: property.generalInformation,
          locationInformation: property.locationInformation,
          negotiationInformation: property.negotiationInformation,
          documentsInformation: property.documentsInformation,
        }
      : {
          locationInformation: {
            country: 'Venezuela',
          },
          negotiationInformation: {
            price: '0',
            minimumNegotiation: '0',
          },
        },
  });

  console.log(form.formState);
  const { append: appendDistribution } = useFieldArray({ control: form.control, name: 'distributions' });
  const { append: appendAttribute } = useFieldArray({ control: form.control, name: 'attributes' });
  const { append: appendEquipment } = useFieldArray({ control: form.control, name: 'equipments' });
  const { append: appendUtility } = useFieldArray({ control: form.control, name: 'utilities' });
  const { append: appendAdjacency } = useFieldArray({ control: form.control, name: 'adjacencies' });

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
    appendDistributions();
    appendAdjacencies();
  }, []);

  async function onSubmit(values: z.infer<typeof PropertyFormSchema>) {
    if (property) {
      const { success, error } = await createUpdateProperty(values, images, true, property.id);
      if (success) {
        toast.success('Se actualizo el inmueble con exito!');
        router.back();
      } else {
        toast.error(`Ocurrio un error al intentar actualizar el inmueble`);
        console.log(error);
      }
    } else {
      const { success, error } = await createUpdateProperty(values, images, false, '');
      if (success) {
        toast.success('Se registro el inmueble con exito!');
        router.back();
      } else {
        toast.error(`Ocurrio un error al intentar registrar el inmueble: ${error}`);
        console.log(error);
      }
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
      appendEquipment({ ...item, equipmentId: item.id });
    });
  }

  function appendUtilities() {
    utilities.forEach((item) => {
      appendUtility({ ...item, utilityId: item.id });
    });
  }

  function appendDistributions() {
    distributions.forEach((item) => {
      appendDistribution({ ...item, distributionId: item.id });
    });
  }

  function appendAdjacencies() {
    adjacencies.forEach((item) => {
      appendAdjacency({ ...item, adjacencyId: item.id });
    });
  }

  function handleStep(action: 'next' | 'prev') {
    const length = FormSectionOptions.length;
    const index = FormSectionOptions.indexOf(section);
    if (action === 'prev') {
      if (index === 0) return;
      setSection(FormSectionOptions[index - 1]);
    } else {
      if (index === length - 1) return;
      setSection(FormSectionOptions[index + 1]);
    }
  }

  function formatErrorSection(key: string) {
    switch (key) {
      case 'generalInformation':
        return 'Informacion General';
      case 'locationInformation':
        return 'Informacion de Ubicacion';
      case 'negotiationInformation':
        return 'Informacion de Negociacion';
      case 'documentsInformation':
        return 'Informacion de Documentos';
      default:
        return key;
    }
  }

  return (
    <div className="p-4 container mx-auto">
      <div className="flex justify-end w-full">
        <div className="w-full lg:w-[200px] border-b-2 border-gray-200 lg:border-none pb-5">
          <p className="font-bold text-sm mb-1">Estas viendo</p>
          <Select value={section} onValueChange={(value) => setSection(value as FormSection)}>
            <SelectTrigger className="">
              <SelectValue placeholder="Seccion de propiedad" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {FormSectionOptions.map((opt) => (
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
          {section === 'Atributos y Distribucion' && <AttributesInformation />}
          {section === 'Visuales' && <VisualsInformation />}
          {section === 'Equipos y Servicios' && <DistributionAndEquipmentInformation />}
          {section === 'Negociacion' && <NegotiationInformationComponent />}
          {section === 'Documentos' && <DocumentsInformationComponent />}
          {section === 'Vista previa' && <PreviewProperty goToSection={setSection} />}

          {Object.keys(form.formState.errors).length > 0 && (
            <Alert variant="destructive" className="mt-5">
              <AlertTitle>Existen errores en las siguientes secciones del formulario</AlertTitle>
              <AlertDescription>
                <ul>
                  {Object.keys(form.formState.errors).map((key) => (
                    <li key={key}>
                      <span className="mr-2">*</span>
                      <span>{formatErrorSection(key)}</span>
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-center gap-3 mt-10">
            {section === 'Vista previa' && (
              <Button disabled={form.formState.isSubmitting} type="submit" className="w-full lg:w-auto bg-red-900">
                {form.formState.isSubmitting && (
                  <div className="w-4 h-4 border-4 mr-2 border-solid border-t-transparent rounded-full animate-spin"></div>
                )}
                {form.formState.isSubmitting ? 'Guardando cambios...' : 'Guardar cambios'}
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
