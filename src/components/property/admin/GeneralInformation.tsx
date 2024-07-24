'use client';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export function GeneralInformation() {
  const { control } = useFormContext();

  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion general</h1>
      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={control}
          name="generalInformation.publicationTitle"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Titulo de publicacion</FormLabel>
              <FormControl>
                <Input placeholder="Titulo" {...field} />
              </FormControl>
              <FormDescription>Este es el titulo que se mostrara en tu URL y en las busquedas de google.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInformation.description"
          render={({ field }) => (
            <FormItem className="col-span-12 my-5">
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea className="min-h-[150px]" placeholder="Descripcion" {...field} />
              </FormControl>
              <FormDescription>Este es la descripcion de el inmueble. Tambien aparecera en las busquedas de google.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          defaultValue={''}
          name="generalInformation.code"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Codigo</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalInformation.propertyType"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Tipo de propiedad</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.propertyCondition"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Tipo de mercado</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.footageGround"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Metraje de terreno</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.footageBuilding"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Metraje de construccion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.antiquity"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Antiguedad</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.zoning"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Zonificacion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.amountOfFloors"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Cantidad de pisos</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.propertiesPerFloor"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Propiedades por piso</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.typeOfWork"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
              <FormLabel>Tipo de obra</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.handoverKeys"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Se entregaron las llaves a vision inmobiliaria?</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.termsAndConditionsAccepted"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox defaultChecked={field.value} onCheckedChange={field.onChange} {...field} />
              </FormControl>
              <FormLabel>Se aceptan los terminos y condiciones de la ficha tecnica</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.isOccupiedByPeople"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Esta ocupado por personas?</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="generalInformation.isFurnished"
          render={({ field }) => (
            <FormItem className="col-span-12 flex items-end gap-2">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Esta amoblado?</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
