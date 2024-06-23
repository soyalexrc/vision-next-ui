'use client';
import { Button } from '@/components/ui/button';
import { Plus, Upload } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ref, uploadBytes, uploadString } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import { useAppDispatch } from '@/lib/store/hooks';
import { activateLoading, turnOffLoading } from '@/lib/store/features/files/state/filesSlice';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function UploadActionsButtons() {
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [newFolder, setNewFolder] = useState<string>('');
  const basePath = pathname.replace('/administracion/gestion-de-archivos', '').replaceAll('%20', ' ');

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files) {
        for (const file of Array.from(e.target.files)) {
          dispatch(activateLoading({ type: 'UPLOAD', text: `Se esta subiendo ${file.name}...` }));
          const fileRef = ref(storage, `${basePath}/${file.name}`);
          const snapshot = await uploadBytes(fileRef, file);
          console.log(snapshot);
        }
        router.refresh();
        setTimeout(() => {
          dispatch(turnOffLoading());
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function createFolder() {
    try {
      const fileRef = ref(storage, `${basePath}/${newFolder}/.ghostfile`);
      await uploadString(fileRef, '');
      setNewFolder('');
      router.refresh();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-end gap-4 my-6 fixed bottom-2 right-2 left-2 lg:left-auto">
      <Button className="flex gap-2 w-full lg:w-auto" onClick={() => inputRef.current?.click()}>
        <Upload />
        Subir archivo
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="flex gap-2 w-full lg:w-auto">
            <Plus />
            Crear carpeta
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear nueva carpeta</DialogTitle>
            <DialogDescription>El cambio de nombre de carpeta actalmente no es soportado por el sistema.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newFolder" className="text-right">
                Titulo
              </Label>
              <Input
                id="newFolder"
                value={newFolder}
                onChange={({ target: { value } }: { target: { value: string } }) => setNewFolder(value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={createFolder}>
              Crear{' '}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <input type="file" ref={inputRef} className="hidden" multiple id="file" onChange={uploadFile} />
    </div>
  );
}
