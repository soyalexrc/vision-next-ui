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
import {
  addImage,
  removeImage,
  reorderImages,
  selectImagesLoading,
  selectPropertyImages,
} from '@/lib/store/features/propertyImages/state/propertyImagesSlice';

export function VisualsInformation() {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectPropertyImages);
  const loading = useAppSelector(selectImagesLoading);
  const { status } = useAppSelector(selectStatusUploading);
  const [draggedIndex, setDraggedIndex] = useState<any>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const { getValues } = useFormContext();

  const propertyCode = getValues('generalInformation.code');
  const path = `Servicio Inmobiliario/inmuebles/${propertyCode}/imagenes`;

  async function removeImageFromFirebase(image: string) {
    try {
      dispatch(activateLoading({ type: 'REMOVE', text: `Eliminando imagen...` }));
      const fileRef = ref(storage, image);
      await deleteObject(fileRef);
      dispatch(removeImage(image));
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
          const image = await getDownloadURL(snapshot.ref);
          dispatch(addImage(image));
          toast.success(`Se cargo: ${fileRef.name} con exito!`);
        }
        setTimeout(() => {
          dispatch(turnOffLoading());
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDragOver = (e: any) => {
    e.preventDefault(); // Allow dropping within the list
  };

  const handleDragStart = (e: any, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', index); // Store index for reference
  };

  const handleDrop = (e: any, index: number) => {
    const newImages = [...images]; // Create a copy of the image array
    if (draggedIndex !== null && draggedIndex !== index) {
      const [removed] = newImages.splice(draggedIndex, 1);
      newImages.splice(index, 0, removed);
      console.log(images);
      console.log(newImages);
      dispatch(reorderImages(newImages)); // Dispatch action to update Redux store
    }
    setDraggedIndex(null); // Reset dragged index
  };

  return (
    <div>
      <h1 className="text-4xl mb-4">Visuales</h1>
      {loading.status ? (
        <p>{loading.text}</p>
      ) : (
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start" onDragOver={handleDragOver}>
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
          {images.map((image, index) => (
            <ContextMenu key={image}>
              <ContextMenuTrigger draggable onDragStart={(e) => handleDragStart(e, index)} onDrop={(e) => handleDrop(e, index)}>
                <div className="border-2 cursor-grab rounded-xl border-gray-200 p-2 w-[220px] h-[220px]" key={image}>
                  <Image alt="Imagen de propiedad" width={200} height={200} style={{ height: '100%' }} src={image} />
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem className="gap-2 px-3 " onClick={() => removeImageFromFirebase(image)}>
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
