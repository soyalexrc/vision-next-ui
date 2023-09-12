import {Button, Select, SelectItem, Tab, Tabs} from "@nextui-org/react";

export default function Searcher() {

    const animals = [
        {label: 'sample', value: 2}
    ]
    return (
        <section className='my-14 lg:px-24 w-full'>
            <div className="w-full flex justify-center lg:justify-start   mt-4">
                <Tabs aria-label="Options">
                    <Tab key="venta" title="Venta"/>
                    <Tab key="alquiler" title="Alquiler"/>
                    <Tab key="traspaso" title="Traspaso de comercio"/>
                </Tabs>
            </div>
            <div className='py-4 px-4 lg:px-0 lg:grid grid-cols-4 gap-2'>
                <div >
                    <Select
                        size='sm'
                        label="Inmueble"
                        className="lg:max-w-xs mb-4"
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
                        className="mb-4 lg:mb-0 lg:max-w-xs"
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
                        className="lg:max-w-xs mb-4"
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
                        className="mb-4 lg:mb-0 lg:max-w-xs"
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
                        className="lg:max-w-xs mb-4"
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
                        className="mb-4 lg:max-w-xs lg:mb-0"
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
