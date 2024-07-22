'use client';
import { useFormContext } from 'react-hook-form';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PlusCircle, Trash2 } from 'lucide-react';
import { activateLoading, selectStatusUploading, turnOffLoading } from '@/lib/store/features/files/state/filesSlice';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import FileUploadingLoader from '@/components/files-management/FileUploadingLoader';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

export function VisualsInformation() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectStatusUploading);

  const inputRef = useRef<HTMLInputElement>(null);
  const { getValues } = useFormContext();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const propertyCode = getValues('generalInformation.code');
  const path = `Servicio Inmobiliario/inmuebles/${propertyCode}/imagenes`;

  async function getStorageData(showLoader = true) {
    try {
      showLoader && setLoading(true);
      const imagesUrls: string[] = [];
      const { items } = await listAll(ref(storage, path));
      for (const item of items) {
        const imageRef = ref(storage, item.fullPath);
        const downloadUrl = await getDownloadURL(imageRef);
        imagesUrls.push(downloadUrl);
      }
      setImages(imagesUrls);
      console.log('here');
      showLoader && setLoading(false);
    } catch (err) {
      console.log(err);
      showLoader && setLoading(false);
    }
  }

  async function removeImage(image: string) {
    try {
      dispatch(activateLoading({ type: 'REMOVE', text: `Eliminando imagen...` }));
      const fileRef = ref(storage, image);
      await deleteObject(fileRef);
      await getStorageData(false);
      setTimeout(() => {
        dispatch(turnOffLoading());
        toast.success(`Se elimino: ${fileRef.name} con exito!`);
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(JSON.stringify(err));
      dispatch(turnOffLoading());
    }
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files) {
        for (const file of Array.from(e.target.files)) {
          dispatch(activateLoading({ type: 'UPLOAD', text: `Subiendo imagen...` }));
          const fileRef = ref(storage, `${path}/${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          console.log(snapshot);
          toast.success(`Se cargo: ${fileRef.name} con exito!`);
        }
        await getStorageData(false);
        setTimeout(() => {
          dispatch(turnOffLoading());
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getStorageData();
  }, []);

  return (
    <div>
      <h1 className="text-4xl mb-4">Visuales</h1>
      {loading ? (
        <p>Cargando archivos...</p>
      ) : (
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
          <div
            onClick={() => inputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed rounded-xl border-gray-200 flex gap-2 p-2 sm:p-0 items-center w-full sm:w-[220px] sm:h-[220px] justify-center "
          >
            {!status && (
              <>
                <PlusCircle color="gray" />
                <p className="text-sm text-gray-500">Agregar imagen</p>
              </>
            )}
            {status && <FileUploadingLoader />}
          </div>
          {images.map((image) => (
            <ContextMenu>
              <ContextMenuTrigger>
                <div className="border-2 rounded-xl border-gray-200 p-2 w-[220px] h-[220px]" key={image}>
                  <Image alt="Imagen de propiedad" width={200} height={200} style={{ height: '100%' }} src={image} />
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem className="gap-2 px-3 " onClick={() => removeImage(image)}>
                  <Trash2 />
                  Eliminar
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg, image/png, image/webp"
        ref={inputRef}
        className="hidden"
        multiple
        id="file"
        onChange={uploadImage}
      />
    </div>
  );
}
