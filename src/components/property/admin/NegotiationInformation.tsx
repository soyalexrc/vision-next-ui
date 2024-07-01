import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export function NegotiationInformation() {
  const { control } = useFormContext();
  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion de negociacion</h1>

      <FormField
        control={control}
        name="negotiationInformation.price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.partOfPayment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recibe como parte de pago</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.minimumNegotiation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Negociacion minima</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.reasonToSellOrRent"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Motivo de operacion</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.realStateAdviser"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Asesor Vision</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.operationType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de operacion</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.propertyExclusivity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Exclusividad</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.ownerPaysCommission"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Propietario paga comision</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.sellCommission"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Comision de venta</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.rentCommission"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Comision de alquiler</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <h2 className="text-2xl my-4 text-center">Datos de captacion externa</h2>

      <FormField
        control={control}
        name="negotiationInformation.ally"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Aliado</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.externalAdviser"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Captacion asesor externo</FormLabel>
            <FormControl>
              <Input placeholder="Precio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <h2 className="text-2xl my-4 text-center">EL propietario autoriza publicar en:</h2>

      <FormField
        control={control}
        name="negotiationInformation.socialMedia"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Redes sociales</FormLabel>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.realStateWebPages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Paginas de inmuebles</FormLabel>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.realStateGroups"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grupos inmobiliarios</FormLabel>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.mouthToMouth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Boca a boca</FormLabel>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="negotiationInformation.publicationOnBuilding"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormLabel>Aviso en fachada</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
