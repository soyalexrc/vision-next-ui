import { useAppSelector } from '@/lib/store/hooks';
import { selectPropertyImages } from '@/lib/store/features/files/state/filesSlice';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { CheckIcon } from '@/components/icons';
import { AdjacencyForm, AttributeForm, EquipmentForm, UtilityForm } from '@/components/property/admin/PropertyForm';

export default function PreviewProperty() {
  const images = useAppSelector(selectPropertyImages);
  const { control, getValues } = useFormContext();

  const publicationTitle = getValues('generalInformation.publicationTitle');
  const description = getValues('generalInformation.description');
  const code = getValues('generalInformation.code');
  const footageGround = getValues('generalInformation.footageGround');
  const footageBuilding = getValues('generalInformation.footageBuilding');
  const avenue = getValues('locationInformation.avenue');
  const street = getValues('locationInformation.street');
  const isClosedStreet = getValues('locationInformation.isClosedStreet');
  const municipality = getValues('locationInformation.municipality');
  const referencePoint = getValues('locationInformation.referencePoint');
  const howToGet = getValues('locationInformation.howToGet');
  const operationType = getValues('negotiationInformation.operationType');
  const price = getValues('negotiationInformation.price');
  const city = getValues('locationInformation.city');
  const state = getValues('locationInformation.state');
  const country = getValues('locationInformation.country');

  const { fields: attributes } = useFieldArray({
    control,
    name: 'attributes',
  });

  const { fields: utilities } = useFieldArray({
    control,
    name: 'utilities',
  });

  const { fields: equipments } = useFieldArray({
    control,
    name: 'equipments',
  });

  const { fields: adjacencies } = useFieldArray({
    control,
    name: 'adjacencies',
  });

  return (
    <div>
      {/*    Image */}
      <div className="w-full border-4 border-dashed border-gray-300 relative h-[150px] lg:h-[300px]">
        {images.length > 0 && <img src={images[0]} className="w-full object-cover w-full h-full" alt="Imagen principal de publicacion" />}
        <div className="absolute z-20 top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-40">
          <Button className="bg-white text-black hover:bg-red-900 hover:text-white">Ir a configuracion de imagenes</Button>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-5">
        {/*  title - short location - ref (code) */}
        <div className="col-span-12 lg:col-span-8 ">
          {operationType ? (
            <Badge variant="outline" className="border-red-900 text-red-900 lg:hidden mb-2">
              {operationType}
            </Badge>
          ) : (
            <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-xs">
              Agregar tipo de operacion
            </div>
          )}
          {publicationTitle ? (
            <p className="text-3xl">{publicationTitle}</p>
          ) : (
            <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-xl">
              Agregar titulo de publicacion
            </div>
          )}
          <div className="my-4 flex gap-2">
            {city ? (
              <p className="text-lg">{city}, </p>
            ) : (
              <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-sm">
                Agregar ciudad
              </div>
            )}
            {state ? (
              <p className="text-lg">{state}, </p>
            ) : (
              <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-sm">
                Agregar estado
              </div>
            )}
            {country ? (
              <p className="text-lg">{country}</p>
            ) : (
              <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-sm">
                Agregar pais
              </div>
            )}
          </div>
          <p>REF - {code}</p>
        </div>
        {/*  operationType - price */}
        <div className="col-span-12 lg:col-span-4 flex justify-end">
          <div className="flex flex-col items-center mt-5 lg:mt-0 lg:items-end w-full gap-2">
            {operationType ? (
              <Badge variant="outline" className="border-red-900 text-red-900 hidden lg:block">
                {operationType}
              </Badge>
            ) : (
              <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-xs">
                Agregar tipo de operacion
              </div>
            )}
            {price ? (
              <p className="text-3xl text-red-900">$ {price}</p>
            ) : (
              <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-xl">
                Agregar precio
              </div>
            )}
          </div>
        </div>
        <div className="col-span-12 flex items-center justify-center gap-3 my-5 border-b-4 pb-5">
          {footageGround ? (
            <>
              <p className="text-gray-500 font-bold text-xs">{footageGround} m2</p>
              <span>-</span>
            </>
          ) : (
            <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-xs">
              Agregar metraje de terreno
            </div>
          )}
          {footageBuilding ? (
            <>
              <p className="text-gray-500 font-bold text-xs">{footageBuilding} m2</p>
              <span>-</span>
            </>
          ) : (
            <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-xs">
              Agregar metraje de construccion
            </div>
          )}
          {avenue ? (
            <p className="text-gray-500 font-bold text-xs">{avenue}</p>
          ) : (
            <div className="border-2 border-dashed border-gray-300 w-fit px-4 py-1 text-gray-600 cursor-pointer text-xs">
              Agregar avenida
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/*  Descrition - distribution - utilities - attributes - images - location */}
        <div className="col-span-12 lg:col-span-9">
          <p className="text-2xl my-8">Descripcion</p>
          {description ? (
            <p>{description}</p>
          ) : (
            <div className="border-2 border-dashed border-gray-300 h-[150px] flex items-center justify-center px-4 py-1 text-gray-600 cursor-pointer">
              Agregar descripcion
            </div>
          )}
          <p className="text-2xl my-8">Comentarios de distribucion</p>
          <div className="border-2 border-dashed border-gray-300 h-[150px] flex items-center justify-center px-4 py-1 text-gray-600 cursor-pointer">
            Agregar comentarios de distribucion
          </div>
          <p className="text-2xl my-8 ">Caracteristicas</p>
          {attributes.some((item) => {
            const { value } = item as AttributeForm;
            return value;
          }) ? (
            <div className="grid gap-x-8 grid-cols-2">
              {attributes.map((item) => {
                const { label, id, value, formType } = item as AttributeForm;
                if (value) {
                  return (
                    <div key={id} className="col-span-2 md:col-span-1 flex justify-between border-b-2 border-gray-100 pb-2 mb-2">
                      <p className="text-sm">{label}</p>
                      {formType === 'check' ? (
                        <CheckIcon width={25} height={25} fill="green" />
                      ) : (
                        <span className="font-bold">{value.toString()}</span>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 h-[150px] flex items-center justify-center px-4 py-1 text-gray-600 cursor-pointer">
              Agregar atributos / caracteristicas
            </div>
          )}
          <p className="text-2xl my-8 ">Servicios</p>
          {utilities.some((item) => {
            const { value } = item as UtilityForm;
            return value;
          }) ? (
            <div>
              {utilities.map((item) => {
                const { title, id, value, additionalInformation } = item as UtilityForm;
                if (value) {
                  return (
                    <div key={id} className="flex justify-between border-b-2 border-gray-100 pb-2 mb-2">
                      <p className="text-sm">
                        {title}
                        {additionalInformation && <span className="text-gray-400 font-bold">: ({additionalInformation})</span>}
                      </p>
                      <CheckIcon width={25} height={25} fill="green" />
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 h-[150px] flex items-center justify-center px-4 py-1 text-gray-600 cursor-pointer">
              Agregar servicios / utilidades
            </div>
          )}

          <p className="text-2xl my-8 ">Equipos</p>
          {equipments.some((item) => {
            const { value } = item as EquipmentForm;
            return value;
          }) ? (
            <div>
              {equipments.map((item) => {
                const { title, id, value, additionalInformation, brand } = item as EquipmentForm;
                if (value) {
                  return (
                    <div key={id} className="flex justify-between border-b-2 border-gray-100 pb-2 mb-2">
                      <p className="text-sm">
                        {title}
                        {brand && <span> {brand}</span>}
                        {additionalInformation && <span className="text-gray-400 font-bold">: ({additionalInformation})</span>}
                      </p>
                      <CheckIcon width={25} height={25} fill="green" />
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 h-[150px] flex items-center justify-center px-4 py-1 text-gray-600 cursor-pointer">
              Agregar equipos
            </div>
          )}

          <p className="text-2xl my-8 ">Galeria</p>
          {images.length > 0 && (
            <div className="grid grid-cols-12 gap-2">
              {images.map((image: string) => (
                <img
                  className="w-full col-span-12 sm:col-span-6 lg:col-span-4 h-[200px] object-cover rounded cursor-zoom-in"
                  key={image}
                  src={image}
                  alt=""
                />
              ))}
            </div>
          )}
          {images.length < 1 && (
            <div className="border-2 border-dashed border-gray-300 h-[150px] lg:h-[200px] w-[200px] flex items-center justify-center px-4 py-1 text-gray-600 cursor-pointer">
              Agregar imagenes
            </div>
          )}
          <p className="text-2xl my-8 ">Ubicacion y adyacencias</p>
          <p>
            {municipality ? (
              municipality + ', '
            ) : (
              <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar municipio</span>
            )}
            {city ? city + ', ' : <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar ciudad</span>}
            {state ? state + ', ' : <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar estado</span>}
            {country ? country + ', ' : <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar pais</span>}
          </p>
          <p className="mt-3">
            <b>Av:</b>
            {avenue ? avenue : <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar avenida</span>}
          </p>
          <p className="mt-3">
            <b>Calle:</b>{' '}
            {street ? street : <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar calle</span>}
          </p>
          <p className="mt-3">
            <b>Es calle cerrada ?:</b>{' '}
            {isClosedStreet ? (
              isClosedStreet
            ) : (
              <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar valor</span>
            )}
          </p>
          <p className="mt-3">
            <b>Punto de referencia: </b>
            {referencePoint ? (
              referencePoint
            ) : (
              <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar punto de referencia</span>
            )}
          </p>
          <p className="mt-3">
            <b>Como llegar: </b>
            {howToGet ? howToGet : <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar valor</span>}
          </p>
          <div className="mt-3">
            <p className="font-bold mb-2">Adyacencias: </p>
            {adjacencies.some((item) => {
              const { value } = item as AdjacencyForm;
              return value;
            }) ? (
              <div className="flex flex-wrap gap-2">
                {adjacencies.map((item) => {
                  const { title, id, value } = item as AdjacencyForm;
                  if (value) {
                    return (
                      <Badge key={id} className="text-sm" variant="secondary">
                        {title}
                      </Badge>
                    );
                  }
                })}
              </div>
            ) : (
              <span className="mx-2 border-2 border-gray-300 border-dashed text-xs px-2 py-1">Agregar adyacencias</span>
            )}
          </div>
        </div>

        {/*  Sample box of contact us*/}
        <div className="col-span-12 lg:col-span-3">
          <p className="text-xl text-center mb-3">Contactanos</p>
          <p className="text-sm text-center lg:text-left">
            Si deseas más información sobre esta propiedad, por favor, rellena el formulario.
          </p>
          <div className="my-5">
            <Input disabled className="mb-4" type="text" placeholder="Nombres y apellidos" />
            <Input disabled className="mb-4" type="email" placeholder="Email" />
            <Input disabled className="mb-4" type="tel" placeholder="Telefono" />
            <Textarea disabled placeholder="Mensaje" className="w-full" />
            <div className="my-5 flex gap-2 items-center">
              <Checkbox disabled defaultChecked />
              <span className="text-xs">
                He leido y acepto los{' '}
                <Link className="text-xs" href="/public">
                  terminos y condiciones
                </Link>
              </span>
            </div>

            <div className="flex justify-center">
              <Button disabled className="bg-red-900 text-white">
                Enviar informacion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
