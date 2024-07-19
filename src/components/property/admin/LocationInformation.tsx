'use client';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function LocationInformation() {
  const { control } = useFormContext();
  return (
    <div>
      <h1 className="text-4xl mb-4">Informacion de ubicacion</h1>

      <FormField
        control={control}
        name="locationInformation.country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pais</FormLabel>
            <FormControl>
              <Input placeholder="Pais" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ciudad</FormLabel>
            <FormControl>
              <Input placeholder="Ciudad" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <Input placeholder="state" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.municipality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Municipio</FormLabel>
            <FormControl>
              <Input placeholder="municipality" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.urbanization"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Urbanizacion</FormLabel>
            <FormControl>
              <Input placeholder="urbanization" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.avenue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Avenida</FormLabel>
            <FormControl>
              <Input placeholder="avenue" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.street"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Calle</FormLabel>
            <FormControl>
              <Input placeholder="Calle " {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.isClosedStreet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Es una calle cerrada?</FormLabel>
            <FormControl>
              <Input placeholder="Si, No " {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ubicacion</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.tower"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Torre</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.floor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nro. de piso</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.referencePoint"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Punto de referencia</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.nomenclature"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nomenclatura de propiedad</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.howToGet"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Como llegar?</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.parkingNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numero de estacionamiento</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.parkingLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nivel de estacionamiento</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.trunkNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numero de maletero</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="locationInformation.trunkLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nivel de maletero</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
