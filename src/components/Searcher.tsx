import {Button, Select, SelectItem, Tab, Tabs} from "@nextui-org/react";

export default function Searcher() {

    const animals = [
        {label: 'sample', value: 2}
    ]
    return (
        <section className='my-14 px-24 w-full'>
            <div className="w-full flex justify-start   mt-4">
                <Tabs aria-label="Options">
                    <Tab key="venta" title="Venta"/>
                    <Tab key="alquiler" title="Alquiler"/>
                    <Tab key="traspaso" title="Traspaso fondo de comercio"/>
                </Tabs>
            </div>
            <div className='py-4 grid grid-cols-4 gap-2'>
                <div>
                    <Select
                        size='sm'
                        label="Inmueble"
                        className="max-w-xs mb-4"
                    >
                        {animals.map((animal) => (
                            <SelectItem key={animal.value} value={animal.value}>
                                {animal.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        size='sm'
                        label="Precio"
                        className="max-w-xs"
                    >
                        {animals.map((animal) => (
                            <SelectItem key={animal.value} value={animal.value}>
                                {animal.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select
                        size='sm'
                        label="Estado"
                        className="max-w-xs mb-4"
                    >
                        {animals.map((animal) => (
                            <SelectItem key={animal.value} value={animal.value}>
                                {animal.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        size='sm'
                        label="Referencia"
                        className="max-w-xs"
                    >
                        {animals.map((animal) => (
                            <SelectItem key={animal.value} value={animal.value}>
                                {animal.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select
                        size='sm'
                        label="Municipio"
                        className="max-w-xs mb-4"
                    >
                        {animals.map((animal) => (
                            <SelectItem key={animal.value} value={animal.value}>
                                {animal.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        size='sm'
                        label="Otras opciones"
                        className="max-w-xs"
                    >
                        {animals.map((animal) => (
                            <SelectItem key={animal.value} value={animal.value}>
                                {animal.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className='flex items-end justify-center px-2'>
                    <Button size='lg' fullWidth>Buscar</Button>
                </div>

            </div>
        </section>
    )
}
