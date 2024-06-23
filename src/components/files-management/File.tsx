'use client';
import { CloudDownload, File, ScanEye, Share } from 'lucide-react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { getDownloadURL, ref } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import useShareSupport from "@/hooks/useShareSupport";

type Props = {
  fullPath: string;
  name: string;
};

export default function FileComponent({ fullPath, name }: Props) {
  const hasShareSupport = useShareSupport();
  async function share() {

    try {
      const fileRef = ref(storage, fullPath);
      const downloadUrl = await getDownloadURL(fileRef);

      const shareData = {
        title: name,
        url: downloadUrl,
      };

      console.log(navigator);

      if (hasShareSupport) {
        await navigator.share(shareData);
      } else {
        alert('share is not supported');
      }
      console.log('File shared successfully!');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div key={fullPath} className="flex items-center gap-2 p-2 cursor-pointer">
          <File className="min-w-[30px]" />
          <p className="text-sm">{name}</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="gap-2 border-b-2">
          <ScanEye />
          Ver
        </ContextMenuItem>
        <ContextMenuItem className="gap-2 border-b-2">
          <CloudDownload />
          Descargar
        </ContextMenuItem>
        <ContextMenuItem disabled={!hasShareSupport} className="gap-2 " onClick={share}>
          <Share />
          Comprartir
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
