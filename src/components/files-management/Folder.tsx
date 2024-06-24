'use client';

import Link from 'next/link';
import { deleteObject, listAll, ref } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Folder, Loader, PencilLine, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { activateLoading, turnOffLoading } from '@/lib/store/features/files/state/filesSlice';
import { toast } from 'sonner';

type Props = {
  fullPath: string;
  name: string;
};

export default function FolderComponent({ fullPath, name }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>(name);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  async function removeFolder() {
    try {
      setLoading(true);
      dispatch(activateLoading({ text: `Preparando archivos para eliminar...`, type: 'REMOVE' }));
      const folderRef = ref(storage, fullPath);
      const listResult = await listAll(folderRef);
      if (listResult.prefixes.length > 0) {
        const nestedFolderRef = ref(storage, listResult.prefixes[0].fullPath);
        const nestedListResult = await listAll(nestedFolderRef);
        for (const file of nestedListResult.items) {
          dispatch(activateLoading({ text: `Se esta eliminando ${file.name}...`, type: 'REMOVE' }));
          await deleteObject(ref(storage, file.fullPath));
        }
        await removeFolder();
      } else {
        for (const file of listResult.items) {
          dispatch(activateLoading({ text: `Se esta eliminando ${file.name}...`, type: 'REMOVE' }));
          await deleteObject(ref(storage, file.fullPath));
        }
      }

      router.refresh();
      dispatch(turnOffLoading());
      setLoading(false);
      toast.success(`Se eliminaron los archivos con exito!`);
    } catch (err) {
      console.log(err);
    }
  }

  async function renameFolder() {
    try {
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link
            href={`/administracion/gestion-de-archivos/${fullPath}`}
            key={fullPath}
            className="flex items-center gap-2 p-2 cursor-pointer transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            {loading && <Loader className="min-w-[30px] animate-spin" />}
            {!loading && <Folder className="w-[30px]" />}
            <p className="text-sm select-none">{name}</p>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem disabled className="gap-2 px-3 border-b-2" onClick={() => setOpen(!open)}>
            <PencilLine />
            Cambiar nombre
          </ContextMenuItem>
          <ContextMenuItem onClick={removeFolder} className="gap-2 px-3">
            <Trash2 />
            Eliminar
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cambiar nombre de carpeta</DialogTitle>
            <DialogDescription>
              El cambio de nombre de carpeta no es una accion que recomendamos ejecutar de manera frecuente..
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newFolder" className="text-right">
                Titulo
              </Label>
              <Input
                id="newFolder"
                value={folderName}
                onChange={({ target: { value } }: { target: { value: string } }) => setFolderName(value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={renameFolder}>
              Cambiar nombre
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
