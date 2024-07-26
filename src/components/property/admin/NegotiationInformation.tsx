'use client';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export function NegotiationInformation() {
  const { control } = useFormContext();
  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion de negociacion</h1>

      <div className="grid grid-cols-12 gap-4">
        <FormField
          control={control}
          name="negotiationInformation.price"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.partOfPayment"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Recibe como parte de pago</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.minimumNegotiation"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Negociacion minima</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.reasonToSellOrRent"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Motivo de operacion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.realStateAdviser"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Asesor Vision</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.operationType"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Tipo de operacion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.propertyExclusivity"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Exclusividad</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.ownerPaysCommission"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Propietario paga comision</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.sellCommission"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Comision de venta</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.rentCommission"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6 lg:col-span-3">
              <FormLabel>Comision de alquiler</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-2xl my-4 text-center col-span-12">Datos de captacion externa</h2>

        <FormField
          control={control}
          name="negotiationInformation.ally"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Aliado</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.externalAdviser"
          render={({ field }) => (
            <FormItem className="col-span-12 md:col-span-6">
              <FormLabel>Captacion asesor externo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-2xl my-4 text-center col-span-12">EL propietario autoriza publicar en:</h2>

        <FormField
          control={control}
          name="negotiationInformation.socialMedia"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Redes sociales</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.realStateWebPages"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Paginas de inmuebles</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.realStateGroups"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Grupos inmobiliarios</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.mouthToMouth"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Boca a boca</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="negotiationInformation.publicationOnBuilding"
          render={({ field }) => (
            <FormItem className="col-span-12 flex gap-2 items-end">
              <FormControl>
                <Checkbox onCheckedChange={field.onChange} defaultChecked={field.value} {...field} />
              </FormControl>
              <FormLabel>Aviso en fachada</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
