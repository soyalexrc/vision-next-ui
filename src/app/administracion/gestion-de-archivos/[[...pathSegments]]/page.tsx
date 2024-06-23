import { listAll, ref } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import FolderComponent from '@/components/files-management/Folder';
import FileComponent from '@/components/files-management/File';
import UploadActionsButtons from '@/components/files-management/UploadActionsButtons';
import FileUploadingLoader from '@/components/files-management/FileUploadingLoader';

interface PageProps {
  params: {
    pathSegments: string[];
  };
}

async function getStorageData(pathSegments: string[] = ['/']) {
  try {
    const pathFormatted = pathSegments.map((segment: string) => segment.replaceAll('%20', ' ')).join('/');
    return await listAll(ref(storage, pathFormatted));
  } catch (err) {
    console.log(err);
  }
}

export default async function Page({ params: { pathSegments } }: PageProps) {
  const data = await getStorageData(pathSegments);

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">Gestion de archivos</h1>
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/administracion/gestion-de-archivos">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathSegments &&
            pathSegments.map((segment: string, index: number, array: string[]) => (
              <div key={segment} className="flex items-center">
                <BreadcrumbItem>
                  <Link href={`/administracion/gestion-de-archivos/${pathSegments.slice(0, index).join('/')}/${segment}`}>
                    {segment.replaceAll('%20', ' ')}
                  </Link>
                </BreadcrumbItem>
                {index < array.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
      <UploadActionsButtons />
      <p className="px-4 mb-4 text-sm text-gray-500">
        Estas viendo <b>{data?.items.length}</b> Archivos en esta carpeta
      </p>
      <FileUploadingLoader />
      {data?.prefixes.map((folder) => <FolderComponent key={folder.fullPath} fullPath={folder.fullPath} name={folder.name} />)}
      {data?.items.map((file) => <FileComponent key={file.name} name={file.name} fullPath={file.fullPath} />)}
    </div>
  );
}
