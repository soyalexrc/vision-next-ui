'use client';
import { CloudDownload, File, Loader, ScanEye, Share } from 'lucide-react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { getDownloadURL, getMetadata, ref } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import useShareSupport from '@/lib/hooks/useShareSupport';
import { useState } from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useWindowSize } from '@/lib/hooks';

type Props = {
  fullPath: string;
  name: string;
};

export default function FileComponent({ fullPath, name }: Props) {
  const hasShareSupport = useShareSupport();
  const [previewData, setPreviewData] = useState<any>(null); // State to store preview data
  const [open, setOpen] = useState<boolean>(false); // State to store preview data
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useWindowSize();

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

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div key={fullPath} className="flex items-center gap-2 p-2 cursor-pointer">
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
          <ContextMenuItem disabled={!hasShareSupport} className="gap-2 px-3 " onClick={share}>
            <Share />
            Comprartir {!hasShareSupport && '(Funcion no disponible)'}
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
    </>
  );
}
