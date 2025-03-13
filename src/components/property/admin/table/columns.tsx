'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CloudDownload, Eye, ImageDown, Pencil, Share2, ShieldCheck, ShieldOff, Star, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import formatCurrency from '@/utils/format-currency';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { activateDeactivateProperty, deleteProperty, toggleFeatured } from '@/actions/property';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useState } from 'react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PropertyPreview = {
  id: string;
  price: number;
  footageGround: string;
  active: boolean;
  operationType: string;
  propertyType: string;
  code: string;
  publicationTitle: string;
  isFeatured: boolean;
  images: string[];
  adviserId: string;
  slug: string;
  footageBuilding: string;
  description: string;
  municipality: string;
  state: string;
  urbanization: string;
  street: string;
  allyId: string;
  externalAdviserId: string;
};

export const columns: ColumnDef<PropertyPreview>[] = [
  {
    accessorKey: 'code',
    header: 'Codigo',
  },
  {
    accessorKey: 'image',
    header: 'Imagen',
    cell: ({ cell }) => {
      const image = cell.row.original.images[0];
      return <Image src={image} width={50} height={50} className="max-h-[50px]" alt="Imagen de inmueble" />;
    },
  },
  {
    accessorKey: 'publicationTitle',
    header: 'Titulo de publicacion',
  },
  {
    accessorKey: 'propertyType',
    header: 'Tipo de propiedad',
  },
  {
    accessorKey: 'operationType',
    header: 'Tipo de operacion',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell }) => {
      const price = cell.row.original.price ?? 0;
      return formatCurrency(price.toString());
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const property = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const queryClient = useQueryClient();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { user } = useUser();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [loading, setLoading] = useState<boolean>(false);

      function isAdviser(): boolean {
        return user?.publicMetadata?.role === 'Asesor inmobiliario' || user?.publicMetadata?.role === 'Asesor inmobiliario Vision';
      }

      function validateOwnerShip(property: PropertyPreview): boolean {
        if (isAdviser()) {
          return isAdviser() && property.adviserId === user?.id;
        }
        return true;
      }

      const shareContent = (title: string, slug: string) => {
        if (navigator.share) {
          navigator
            .share({
              title,
              text: 'Mira estos increíbles inmuebles que te pueden interesar.',
              url: 'https://visioninmobiliaria.com.ve/inmuebles/' + slug, // Gets the current URL
            })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.error('Error sharing:', error));
        } else {
          navigator.clipboard.writeText('https://visioninmobiliaria.com.ve/inmuebles/' + slug);
          toast.success('Link copiado al portapapeles');
        }
      };

      async function handleActivateDeactivateProperty(id: string, current: boolean) {
        const t = toast.loading(`Se esta ${current ? 'Desactivando' : 'Activando'} el inmueble`, {
          duration: 20000,
        });
        const { success, error } = await activateDeactivateProperty(id, current);
        if (success) {
          toast.success(`Se ${current ? 'Desactivo' : 'Activo'} el inmueble con exito!`);
          toast.dismiss(t);
          await queryClient.invalidateQueries({ queryKey: ['properties'] });
        } else {
          toast.dismiss();
          toast.error(`Ocurrio un error al intentar ${current ? 'Desactivar' : 'Activar'} el inmueble  ${error}`);
          console.log(error);
        }
      }

      async function handleDeleteProperty(id: string, imagesPaths: string[], code: string) {
        const t = toast.loading('Se esta eliminando el inmueble', {
          duration: 20000,
        });
        const { success, error } = await deleteProperty(id, imagesPaths, code);
        if (success) {
          toast.success('Se elimino el inmueble con exito!');
          toast.dismiss(t);
          await queryClient.invalidateQueries({ queryKey: ['properties'] });
        } else {
          toast.dismiss();
          toast.error(`Ocurrio un error al intentar eliminar el inmueble  ${error}`);
          console.log(error);
        }
      }

      async function handleToggleFeatured(id: string, currentValue: boolean) {
        const t = toast.loading('Se esta actualizando la informacion', {
          duration: 20000,
        });
        const { success, error } = await toggleFeatured(id, currentValue);
        toast.dismiss(t);
        if (success) {
          toast.success('Se actualizo la informacion con exito!');
          await queryClient.invalidateQueries({ queryKey: ['properties'] });
        } else {
          toast.error(`Ocurrio un error al actualizar la informacion  ${error}`);
          console.log(error);
        }
      }

      async function handleDownloadAssets() {
        const zip = new JSZip();
        const images = row.original.images;

        const t = toast.loading('Se estan descargando las imagenes de el inmueble');
        setLoading(true);
        for (let i = 0; i < images.length; i++) {
          try {
            // const imageRef = ref(storage, images[i]);
            // const blob = await getBlob(imageRef);
            const response = await fetch(images[i]);
            const blob = await response.blob();
            zip.file(`${row.original.code}-${i + 1}.jpg`, blob);
          } catch (error) {
            console.error('Error downloading image:', images[i], error);
          }
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `IMAGENES_${row.original.code}.zip`);
        toast.dismiss(t);
        setLoading(false);
        toast.success('Imagenes descargadas con exito!');
      }

      return (
        <div className="flex gap-2">
          {!isAdviser() && (
            <AlertDialog>
              <AlertDialogTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {property.active ? (
                        <ShieldCheck size={16} className="text-green-500" />
                      ) : (
                        <ShieldOff size={16} className="text-yellow-500" />
                      )}
                    </TooltipTrigger>
                    <TooltipContent
                      style={{
                        background: 'black',
                        color: 'white',
                        padding: '6px',
                        borderRadius: '4px',
                      }}
                    >
                      {property.active ? 'Desactivar' : 'Activar'} inmueble ({property.code})
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {property.active ? 'Desactivar' : 'Activar'} inmueble ({property.code})?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {property.active
                      ? 'Esta seguro de desactivar el inmueble? Se retirara de las busquedas de la pagina web'
                      : 'Esta seguro de activar el inmueble? Se activara en las busquedas de la pagina web'}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleActivateDeactivateProperty(property.id, property.active)}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {validateOwnerShip(property) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={`/administracion/inmuebles/${property.id}`}>
                    <Pencil size={16} className="text-blue-500" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent style={{ background: 'black', color: 'white', padding: '6px', borderRadius: '4px' }}>
                  <p>Editar inmueble</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {!isAdviser() && (
            <AlertDialog>
              <AlertDialogTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Trash size={16} className="text-destructive" />
                    </TooltipTrigger>
                    <TooltipContent
                      style={{
                        background: 'black',
                        color: 'white',
                        padding: '6px',
                        borderRadius: '4px',
                      }}
                    >
                      <p>Eliminar inmueble</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Esta seguro de eliminar el inmueble ({property.code})?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta accion es irreversible. Esto eliminara permanentemente la informacion de la cuenta y los datos de nuestros
                    servidores. Incluidos datos de el inmueble, documentos e imagenes asociadas.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteProperty(property.id, property.images, property.code)}>
                    Continuar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/*<Download size={16} className="cursor-pointer" />*/}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Eye size={16} className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent style={{ background: 'black', color: 'white', padding: '6px', borderRadius: '4px' }}>
                <p>Ver detalle de inmueble</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialog>
            <AlertDialogTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger disabled={loading}>
                    {loading ? (
                      <CloudDownload size={16} className="text-gray-500 animate-pulse" />
                    ) : (
                      <ImageDown size={16} className="cursor-pointer" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent
                    style={{
                      background: 'black',
                      color: 'white',
                      padding: '6px',
                      borderRadius: '4px',
                    }}
                  >
                    <p>Descargar imagenes de inmueble</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Descargar imagenes de inmueble ({property.code})?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDownloadAssets}>Continuar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => shareContent(property.publicationTitle, property.slug)}>
                <Share2 size={16} className="cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent style={{ background: 'black', color: 'white', padding: '6px', borderRadius: '4px' }}>
                <p>Compartir enlace de inmueble</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => handleToggleFeatured(property.id, property.isFeatured)}>
                {!isAdviser() && (
                  <Star size={16} className={`cursor-pointer ${property.isFeatured && 'fill-yellow-400 text-yellow-400'}`} />
                )}
              </TooltipTrigger>
              <TooltipContent style={{ background: 'black', color: 'white', padding: '6px', borderRadius: '4px' }}>
                <p>{property.isFeatured ? 'Quitar de favoritos' : 'Marcar como favorito'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
