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
import { deleteObject, ref, uploadBytes } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import { toast } from 'sonner';

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

  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion de documentacion</h1>

      <h2 className="text-2xl my-4 text-center">Datos de propietario</h2>
      <button>registrar nuevo propietario</button>

      <FormField
        control={control}
        name="documentsInformation.owner"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Propietario</FormLabel>
            <FormControl>
              <Input placeholder="Seleccionar un propietario" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <h2 className="text-2xl my-4 text-center">Datos de apoderado</h2>

      <FormField
        control={control}
        defaultValue={''}
        name="documentsInformation.attorneyFirstName"
        render={({ field }) => (
          <FormItem>
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
          <FormItem>
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
          <FormItem>
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
          <FormItem>
            <FormLabel>Correo electronico</FormLabel>
            <FormControl>
              <Input placeholder="Correo de apoderado" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="documentsInformation.propertyDoc"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormLabel>Documento de propiedad</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="documentsInformation.ownerCIorRIF"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormLabel>C.I / RIF propietario</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="documentsInformation.spouseCIorRIF"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormLabel>C.I / RIF Conyuge</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="documentsInformation.CIorRIF"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormLabel>C.I / RIF</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="power"
        render={({ field }) => (
          <FormItem>
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
        name="documentsInformation.CIorRIF"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormLabel>C.I / RIF</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="documentsInformation.mortgageRelease"
        render={({ field }) => (
          <FormItem>
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
          <FormItem>
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
          <FormItem>
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

      {/*<Divider />*/}

      <h2 className="text-2xl my-4 text-center">{getValues('negotiationInformation.operationType')} de propiedad</h2>

      <FormField
        control={control}
        name="documentsInformation.cadastralRecordYear"
        render={({ field }) => (
          <FormItem>
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
        name="documentsInformation.isCadastralRecordSameOwner"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormLabel>A nombre de propietario</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      {getValues('negotiationInformation.operationType') === 'Venta' && (
        <FormField
          control={control}
          name="documentsInformation.mainProperty"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Vivienda principal</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="documentsInformation.cadastralRecordYear"
        render={({ field }) => (
          <FormItem>
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
        name="documentsInformation.condominiumSolvency"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormLabel>Solvencia de condominio y otros</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
      <h2 className="text-2xl my-4 text-center">Otros documentos</h2>
      {loadingDocuments.status && <p>{loadingDocuments.text}</p>}
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed rounded-xl border-gray-200 flex gap-2 p-2 items-center w-full justify-center "
      >
        {!loading.status && (
          <>
            <PlusCircle color="gray" />
            <p className="text-sm text-gray-500">Agregar documento</p>
          </>
        )}
        {loading.status && <FileUploadingLoader />}
      </div>
      <div className="mt-5">
        {documents.map((doc) => (
          <div key={doc.fullPath} className="flex items-center justify-between p-4 border-b-2 border-gray-100">
            <div className="flex items-center gap-2">
              <File />
              <p>{doc.name}</p>
            </div>
            <Trash2 onClick={() => removeDocumentFromFirebase(doc)} color="red" className="cursor-pointer" />
          </div>
        ))}
      </div>
      <input type="file" ref={inputRef} className="hidden" multiple id="file" onChange={uploadDocument} />
    </div>
  );
}
