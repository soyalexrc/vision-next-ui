import { Button, Input, Select, SelectItem, Tab, Tabs } from '@nextui-org/react';
import {PROPERTY_TYPES} from "@/utils/data/property-types";

export default function Searcher() {
  const animals = [{ label: 'sample', value: 2 }, {label: 'sample 2', value: 33}];
  const attributesOptions = [
    {label: 'Pozo de agua'},
    {label: 'Planta electrica 50%'},
    {label: 'Planta electrica 100%'},
    {label: 'Piscina'},
    {label: 'A estrenar'},
    {label: 'Obra blanca'},
    {label: 'Amoblado'},
    {label: 'Equipado'},
    {label: 'Terraza'},
    {label: 'ocina empotrada'},
  ]
  return (
    <section className="my-14 lg:px-24 w-full">
      <div className="w-full flex justify-center lg:justify-start   mt-4">
        <Tabs aria-label="Options">
          <Tab key="venta" title="Venta" />
          <Tab key="alquiler" title="Alquiler" />
          <Tab key="traspaso" title="Traspaso de fondo de comercio" />
        </Tabs>
      </div>
      <div className="py-4 px-4 lg:px-0 lg:grid grid-cols-4 gap-2">
        <div>
          <Select size="sm" label="Propiedad" className="lg:max-w-xs mb-4">
            {PROPERTY_TYPES.map((animal) => (
              <SelectItem key={animal} value={animal}>
                {animal}
              </SelectItem>
            ))}
          </Select>
          <div className="flex gap-3 items-center mb-4 lg:mb-0">
            <Input size="sm" type="number" label="Desde" />
            <span>-</span>
            <Input size="sm" type="number" label="Hasta" />
          </div>
        </div>
        <div>
          <Select size="sm" label="Estado" className="lg:max-w-xs mb-4">
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Input size="sm" type="text" label="Codigo" className='mb-4 lg:mb-0' />
        </div>
        <div>
          <Select size="sm" label="Municipio" className="lg:max-w-xs mb-4">
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Select size="sm" selectionMode="multiple" label="Atributos" className="mb-4 lg:max-w-xs lg:mb-0">
            {attributesOptions.map((attribute) => (
              <SelectItem key={attribute.label} value={attribute.label}>
                {attribute.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Select size="sm" label="Zona" className="lg:max-w-xs mb-4">
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex items-end justify-center px-2 mt-5">
        <Button size="lg">Buscar</Button>
      </div>
    </section>
  );
}
