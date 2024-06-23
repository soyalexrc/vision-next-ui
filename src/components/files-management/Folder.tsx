'use client';

import Link from 'next/link';
import { getBlob, getDownloadURL, listAll, ref, uploadBytes } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Folder } from 'lucide-react';
import { usePathname } from 'next/navigation';

type Props = {
  fullPath: string;
  name: string;
};

export default function FolderComponent({ fullPath, name }: Props) {
  const pathname = usePathname();
  async function renameFolder(olderFolderName: string, newFolderName: string) {
    const currentFolderName = pathname
      .replace('administracion/gestion-de-archivos', '')
      .replaceAll('%20', ' ')
      .concat(`/${olderFolderName}`);
    const nextFolderName = pathname.replace('administracion/gestion-de-archivos', '').replaceAll('%20', ' ').concat(`/${newFolderName}`);
    const oldFolderRef = ref(storage, currentFolderName);
    const newFolderRef = ref(storage, nextFolderName);

    try {
      const listResult = await listAll(oldFolderRef);
      if (listResult.prefixes.length > 0) alert('Esta carpeta contiene mas carpetas dentro de ella, no es posible renombrarla por ahora');

      const downloadPromises = listResult.items.map(async (itemRef) => {
        return await getBlob(itemRef);
      });
      // Wait for all downloads to complete
      const downloadedFiles = await Promise.all(downloadPromises);

      console.log(downloadedFiles);

      // Upload downloaded files to the new folder
      const uploadPromises = downloadedFiles.map(async (file) => {
        const newFileRef = ref(newFolderRef, file.name); // Maintain file name
        await uploadBytes(newFileRef, file); // Upload the downloaded file content
      });

      await Promise.all(uploadPromises);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          href={`/administracion/gestion-de-archivos/${fullPath}`}
          key={fullPath}
          className="flex items-center gap-2 p-2 cursor-pointer"
        >
          <Folder className="w-[30px]" />
          <p className="text-sm">{name}</p>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => renameFolder(name, 'Sample')}>Rename to "sample"</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
