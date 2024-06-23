import { listAll, ref } from '@firebase/storage';
import storage from '@/lib/firebase/storage';
import Icon from '@/components/ui/icon';
import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import FolderComponent from "@/components/files-management/Folder";

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
  console.log(pathSegments);

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
      {data?.prefixes.map((folder) => <FolderComponent key={folder.fullPath} fullPath={folder.fullPath} name={folder.name} />)}
      {data?.items.map((file) => (
        <div key={file.fullPath} className="flex items-center gap-2 p-2 cursor-pointer">
          <Icon name="file" className="min-w-[30px]" />
          <p className="text-sm">{file.name}</p>
        </div>
      ))}
    </div>
  );
}
