'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  activateLoading,
  addDocument,
  PropertyDocument,
  removeDocument,
  selectDocumentsLoading,
  selectPropertyDocuments,
  selectStatusUploading,
  turnOffLoading,
} from '@/lib/store/features/files/state/filesSlice';
import { File, PlusCircle, Trash2 } from 'lucide-react';
import FileUploadingLoader from '@/components/files-management/FileUploadingLoader';
import React, { useRef } from 'react';
import { deleteObject, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export function DocumentsInformation() {
  const { control, getValues } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const documents = useAppSelector(selectPropertyDocuments);
  const loadingDocuments = useAppSelector(selectDocumentsLoading);
  const loading = useAppSelector(selectStatusUploading);

  const propertyCode = getValues('generalInformation.code');
  const path = `Servicio Inmobiliario/inmuebles/${propertyCode}/documentos`;

  async function uploadDocument(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files) {
        for (const file of Array.from(e.target.files)) {
          dispatch(activateLoading({ type: 'UPLOAD', text: `Subiendo ${file.name}...` }));
          const fileRef = ref(storage, `${path}/${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          dispatch(addDocument({ fullPath: snapshot.ref.fullPath, name: snapshot.ref.name }));
          toast.success(`Se cargo: ${fileRef.name} con exito!`);
          dispatch(turnOffLoading());
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function removeDocumentFromFirebase(doc: PropertyDocument) {
    try {
      dispatch(activateLoading({ type: 'REMOVE', text: `Eliminando ${doc.name}...` }));
      const fileRef = ref(storage, doc.fullPath);
      await deleteObject(fileRef);
      dispatch(removeDocument(doc));
      dispatch(turnOffLoading());
      toast.success(`Se elimino: ${fileRef.name} con exito!`);
    } catch (err) {
      console.log(err);
      toast.error(JSON.stringify(err));
      dispatch(turnOffLoading());
    }
  }

  async function handleDocumentClick(doc: PropertyDocument) {
    try {
      const fileRef = ref(storage, doc.fullPath);
      const url = await getDownloadURL(fileRef);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error opening document:', err);
    }
  }

  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion de documentacion</h1>
      <div className="grid grid-cols-12 gap-4">
        <h2 className="text-2xl my-4 text-center col-span-12">Datos de propietario</h2>

        <FormField
          control={control}
          name="documentsInformation.owner"
          render={({ field }) => (
            <>
              <FormItem className="col-span-9">
                <FormLabel>Propietario</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Seleccionar un propietario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              <div className="col-span-3 flex items-end">
                <Button type="button" className="bg-red-900 w-full flex gap-2" disabled>
                  <PlusCircle width={20} height={20} className="min-w-[20px] min-h-[20px]" />
                  <p className="hidden lg:block">Nuevo propietario</p>
                </Button>
              </div>
            </>
          )}
        />

        <div className="col-span-12 my-5 border-b-2 border-gray-100" />

        <h2 className="text-2xl my-4 text-center col-span-12">Datos de apoderado</h2>

        <FormField
          control={control}
          defaultValue={''}
          name="documentsInformation.attorneyFirstName"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de apoderado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="documentsInformation.attorneyLastName"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Apellido de apoderado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="documentsInformation.attorneyPhone"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Telefono</FormLabel>
              <FormControl>
                <Input placeholder="Telefono de apoderado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="documentsInformation.attorneyEmail"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Correo electronico</FormLabel>
              <FormControl>
                <Input placeholder="Correo de apoderado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-12 my-5 border-b-2 border-gray-100" />

        <FormField
          control={control}
          name="documentsInformation.propertyDoc"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox defaultChecked={field.value} {...field} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Documento de propiedad</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentsInformation.ownerCIorRIF"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox defaultChecked={field.value} {...field} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>C.I / RIF propietario</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentsInformation.spouseCIorRIF"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox defaultChecked={field.value} {...field} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>C.I / RIF Conyuge</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentsInformation.CIorRIF"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox defaultChecked={field.value} {...field} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>C.I / RIF</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentsInformation.power"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Poder</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="N/A">N/A</SelectItem>
                  <SelectItem value="Por tramitar">Por tramitar</SelectItem>
                  <SelectItem value="Notariado">Notariado</SelectItem>
                  <SelectItem value="Registrado">Registrado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentsInformation.mortgageRelease"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Liberacion de hipoteca</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="N/A">N/A</SelectItem>
                  <SelectItem value="Por tramitar">Por tramitar</SelectItem>
                  <SelectItem value="Registrado">Registrado</SelectItem>
                  <SelectItem value="Solo finiquito">Solo finiquito</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentsInformation.successionDeclaration"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Declaracion sucesoral</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="N/A">N/A</SelectItem>
                  <SelectItem value="Por tramitar">Por tramitar</SelectItem>
                  <SelectItem value="Declaracion">Declaracion</SelectItem>
                  <SelectItem value="Solvencia">Solvencia</SelectItem>
                  <SelectItem value="RIF">RIF</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentsInformation.courtRulings"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Sentencias tribunales</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="N/A">N/A</SelectItem>
                  <SelectItem value="Por tramitar">Por tramitar</SelectItem>
                  <SelectItem value="Registradas">Registradas</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-12 my-5 border-b-2 border-gray-100" />

        <h2 className="text-2xl my-4 text-center col-span-12">{getValues('negotiationInformation.operationType')} de propiedad</h2>

        <FormField
          control={control}
          name="documentsInformation.cadastralRecordYear"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Cedula catastral</FormLabel>
              <FormControl>
                <Input placeholder="Ano" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentsInformation.cadastralRecordYear"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Impuesto inmobiliario</FormLabel>
              <FormControl>
                <Input placeholder="Ano" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documentsInformation.isCadastralRecordSameOwner"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox defaultChecked={field.value} {...field} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>A nombre de propietario</FormLabel>
            </FormItem>
          )}
        />

        {getValues('negotiationInformation.operationType') === 'Venta' && (
          <FormField
            control={control}
            name="documentsInformation.mainProperty"
            render={({ field }) => (
              <FormItem className="col-span-12 flex items-end gap-2">
                <FormControl>
                  <Checkbox defaultChecked={field.value} {...field} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Vivienda principal</FormLabel>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="documentsInformation.condominiumSolvency"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox defaultChecked={field.value} {...field} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Solvencia de condominio y otros</FormLabel>
            </FormItem>
          )}
        />

        <div className="col-span-12 my-5 border-b-2 border-gray-100" />

        <h2 className="text-2xl my-4 text-center col-span-12">Otros documentos</h2>
        {loadingDocuments.status && <p>{loadingDocuments.text}</p>}
        <div
          onClick={() => inputRef.current?.click()}
          className="col-span-12 cursor-pointer border-2 border-dashed rounded-xl border-gray-200 flex gap-2 p-2 items-center w-full justify-center "
        >
          {!loading.status && (
            <>
              <PlusCircle color="gray" />
              <p className="text-sm text-gray-500">Agregar documento</p>
            </>
          )}
          {loading.status && <FileUploadingLoader />}
        </div>
        <div className="mt-5 col-span-12">
          {documents.map((doc) => (
            <div key={doc.fullPath} className="flex items-center justify-between p-4 border-b-2 border-gray-100">
              <div className="flex items-center gap-2">
                <File />
                <p className="hover:underline cursor-pointer hover:text-blue-600" onClick={() => handleDocumentClick(doc)}>
                  {doc.name}
                </p>
              </div>
              <Trash2 onClick={() => removeDocumentFromFirebase(doc)} color="red" className="cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      <input type="file" ref={inputRef} className="hidden" multiple id="file" onChange={uploadDocument} />
    </div>
  );
}
