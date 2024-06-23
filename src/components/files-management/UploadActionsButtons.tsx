'use client';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import React, { useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ref, uploadBytes } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import { useAppDispatch } from '@/lib/store/hooks';
import { updateFilesUploadStatus } from '@/lib/store/features/files/state/filesSlice';

export default function UploadActionsButtons() {
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const basePath = pathname.replace('/administracion/gestion-de-archivos', '').replaceAll('%20', ' ');
    try {
      if (e.target.files) {
        dispatch(updateFilesUploadStatus(true));
        for (const file of Array.from(e.target.files)) {
          const fileRef = ref(storage, `${basePath}/${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          console.log(snapshot);
        }
        router.refresh();
        setTimeout(() => {
          dispatch(updateFilesUploadStatus(false));
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-end gap-4 my-6">
      <Button className="flex gap-2 w-full lg:w-auto" onClick={() => inputRef.current?.click()}>
        <Upload />
        Subir archivo
      </Button>
      <Button variant="secondary" className="flex gap-2 w-full lg:w-auto">
        <Plus />
        Crear carpeta
      </Button>
      <input type="file" ref={inputRef} className="hidden" multiple id="file" onChange={uploadFile} />
    </div>
  );
}
