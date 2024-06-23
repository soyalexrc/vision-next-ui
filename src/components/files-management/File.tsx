'use client';
import { CloudDownload, File, Loader, PencilLine, ScanEye, Share, Trash2 } from 'lucide-react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { deleteObject, getDownloadURL, getMetadata, ref } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import useShareSupport from '@/lib/hooks/useShareSupport';
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useWindowSize } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type Props = {
  fullPath: string;
  name: string;
};

export default function FileComponent({ fullPath, name }: Props) {
  const hasShareSupport = useShareSupport();
  const [previewData, setPreviewData] = useState<any>(null); // State to store preview data
  const [open, setOpen] = useState<boolean>(false); // State to store preview data
  const [openModalChangeName, setOpenModalChangeName] = useState<boolean>(false); // State to store preview data
  const [newFileName, setNewFileName] = useState<string>(getFilenameWithoutExtension(name)); // State to store preview data
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useWindowSize();
  const router = useRouter();

  async function share() {
    try {
      setLoading(true);
      const fileRef = ref(storage, fullPath);
      const downloadUrl = await getDownloadURL(fileRef);

      const shareData = {
        title: name,
        url: downloadUrl,
      };

      if (hasShareSupport) {
        await navigator.share(shareData);
        console.log('File shared successfully!');
      } else {
        alert('share is not supported');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function preview() {
    try {
      setLoading(true);
      const fileRef = ref(storage, fullPath);

      const downloadUrl = await getDownloadURL(fileRef);
      const metadata = await getMetadata(fileRef);

      setPreviewData({
        url: downloadUrl,
        type: metadata.contentType, // Get MIME type from metadata
      });
      setTimeout(() => {
        setOpen(true);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function remove() {
    try {
      setLoading(true);
      const fileRef = ref(storage, fullPath);

      await deleteObject(fileRef);
      router.refresh();
      setTimeout(() => {
        setLoading(false);
        toast.success(`Se elimino: ${fileRef.name} con exito!`);
      }, 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function downloadFile() {
    try {
      setLoading(true);
      const fileRef = ref(storage, fullPath);

      const downloadUrl = await getDownloadURL(fileRef);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.download = name;
      link.click();
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function closeSheet(value: boolean) {
    setOpen(value);
    if (!value) setPreviewData(null);
  }

  function getFilenameWithoutExtension(filename: string) {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return filename; // No extension found, return the whole filename
    }
    return filename.slice(0, lastDotIndex);
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            key={fullPath}
            className="flex items-center gap-2 p-2 cursor-pointer  transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            {loading && <Loader className="min-w-[30px] animate-spin" />}
            {!loading && <File className="min-w-[30px] " />}
            <p className="text-sm">{name}</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem className="gap-2 px-3 border-b-2" onClick={preview}>
            <ScanEye />
            Vista previa
          </ContextMenuItem>
          <ContextMenuItem className="gap-2 px-3 border-b-2" onClick={downloadFile}>
            <CloudDownload />
            Descargar
          </ContextMenuItem>
          <ContextMenuItem disabled={!hasShareSupport} className="gap-2 px-3 border-b-2" onClick={share}>
            <Share />
            Comprartir {!hasShareSupport && '(Funcion no disponible)'}
          </ContextMenuItem>
          <ContextMenuItem className="gap-2 px-3 border-b-2" onClick={() => setOpenModalChangeName(!openModalChangeName)}>
            <PencilLine />
            Cambiar nombre
          </ContextMenuItem>
          <ContextMenuItem className="gap-2 px-3 " onClick={remove}>
            <Trash2 />
            Eliminar
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Sheet open={open} onOpenChange={(value) => closeSheet(value)}>
        <SheetContent side={width >= 600 ? 'right' : 'bottom'} className="h-screen flex flex-col justify-center">
          <SheetHeader>
            <SheetTitle>Detalle de archivo</SheetTitle>
            <SheetDescription>Esta es una vista previa del documento, puedes descargar el documento aqui abajo.</SheetDescription>
          </SheetHeader>
          {previewData?.type.startsWith('image/') && (
            <img alt={name} src={previewData?.url} className="w-full my-6 rounded-sm max-h-[400px] " />
          )}
          {previewData?.type.startsWith('video/') && <video src={previewData.url} controls />}
          {previewData?.type.startsWith('audio/') && <audio src={previewData.url} controls />}
          <p>
            Tipo de archivo: <b>{previewData?.type}</b>
          </p>
          <SheetFooter>
            <Button className="mt-4" type="submit">
              <a href={previewData?.url} download={name} target="_blank">
                Descargar
              </a>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Dialog open={openModalChangeName} onOpenChange={setOpenModalChangeName}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cambiar nombre de archivo</DialogTitle>
            <DialogDescription>
              El cambio de nombre de archivo no es una accion que recomendamos ejecutar de manera frecuente..
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newFolder" className="text-right">
                Titulo
              </Label>
              <Input
                id="newFolder"
                value={newFileName}
                onChange={({ target: { value } }: { target: { value: string } }) => setNewFileName(value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Cambiar nombre</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
