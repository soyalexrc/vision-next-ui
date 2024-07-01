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

      <FormField
        control={control}
        name="generalInformation.publicationTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titulo de publicacion</FormLabel>
            <FormControl>
              <Input placeholder="Titulo" {...field} />
            </FormControl>
            <FormDescription>Este es el titulo que se mostrara en tu URL</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripcion</FormLabel>
            <FormControl>
              <Textarea placeholder="Descripcion" {...field} />
            </FormControl>
            <FormDescription>Este es la descripcion de el inmueble</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Codigo</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.propertyType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de propiedad</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.propertyCondition"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de mercado</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.footageGround"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Metraje de terreno</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.footageBuilding"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Metraje de construccion</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.antiquity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Antiguedad</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.zoning"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Zonificacion</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.amountOfFloors"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cantidad de pisos</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.propertiesPerFloor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Propiedades por piso</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.typeOfWork"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de obra</FormLabel>
            <FormControl>
              <Input placeholder="Codigo" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.handoverKeys"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Se entregaron las llaves a vision inmobiliaria?</FormLabel>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.termsAndConditionsAccepted"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Se aceptan los terminos y condiciones de la ficha tecnica</FormLabel>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.isOccupiedByPeople"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Esta ocupado por personas?</FormLabel>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="generalInformation.isFurnished"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Esta amoblado?</FormLabel>
            <FormControl>
              <Checkbox defaultChecked={field.value} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
