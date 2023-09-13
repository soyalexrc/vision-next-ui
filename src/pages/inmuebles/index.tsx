import {Inter} from 'next/font/google'
import {Button, Checkbox, Input, Link, Select, SelectItem, Textarea} from '@nextui-org/react'
import {http} from "@/utils/axios";
import { useRouter } from 'next/router';
import NextLink from "next/link";
import {useEffect, useState} from "react";
import { useSearchParams } from 'next/navigation'


const inter = Inter({subsets: ['latin']})

const animals = [
    {label: 'sample', value: 2}
]


export default function Home({ properties, page, limit }: any) {
    const router = useRouter();
    const searchParams = useSearchParams()

    const [currentPage, setCurrentPage] = useState('1')
    const [pageLimit, setPageLimit] = useState('10')
    const [state, setState] = useState('')
    const [municipality, setMunicipality] = useState('')
    const [propertyType, setPropertyType] = useState('')
    const [operationType, setOperationType] = useState('')

    useEffect(() => {
        setCurrentPage(searchParams.get('pagina') ?? '1')
        setPageLimit(searchParams.get('limite') ?? '10')
        setState(searchParams.get('state') ?? '')
        setMunicipality(searchParams.get('municipalidad') ?? '')
        setPropertyType(searchParams.get('tipo_de_inmueble') ?? '')
        setOperationType(searchParams.get('tipo_de_operacion') ?? '')
    }, [router.query])

    // Call this function whenever you want to
    // refresh props!
    const refreshData = () => {
        router.replace(router.asPath);
    }

    const updateQuery = () => {
        router.push({
            pathname: '/inmuebles',
            query: {
                pagina: encodeURI(currentPage),
                limite: encodeURI(pageLimit),
                estado: encodeURI(state),
                municipalidad: encodeURI(municipality),
                tipo_de_operacion: encodeURI(operationType),
                tipo_de_propiedad: encodeURI(propertyType)
            },
        });
    };


    return (
        <main
            className={`  min-h-screen  ${inter.className}`}
        >
            <section className='relative'>
                <img src="/about/aboutBanner.jpg" className='h-[200px] object-cover lg:h-full' alt=""/>
                <div
                    className='absolute top-0 left-0 w-full h-full bg-black-opacity flex justify-center items-center flex-col'>
                    <h2 className='text-white text-xl lg:text-4xl tracking-widest mb-2'>Opera con nosotros</h2>
                    <p className='text-white text-sm lg:text-xl text-center'>
                        Consulta nuestra amplia oferta de inmuebles en venta y alquiler. Encuentra la opcion que <br/> mejor se adapte a tus necesidades
                    </p>
                </div>
            </section>

            <section className='px-20 grid gap-4 grid-cols-12'>
                <div className='col-span-3'>
                    <div className='my-5'>
                        <Select size='sm' variant='bordered' className='mb-4' label="Estado">
                            {animals.map((animal) => (
                                <SelectItem key={animal.value} value={animal.value}>
                                    {animal.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select size='sm' variant='bordered' className='mb-4' label="Municipio">
                            {animals.map((animal) => (
                                <SelectItem key={animal.value} value={animal.value}>
                                    {animal.label}
                                </SelectItem>
                            ))}
                        </Select>


                        <h3 className='my-4'>Precio</h3>

                        <div className='mb-4 grid grid-cols-12 justify-items-center items-center'>
                            <Input size='sm' variant='bordered' className='col-span-5' type="text" label="Desde"/>
                            <div className='col-span-2'>-</div>
                            <Input size='sm' variant='bordered' className='col-span-5' type="text" label="Hasta"/>
                        </div>

                        <Select size='sm' variant='bordered' className='mb-4' label="Inmueble">
                            {animals.map((animal) => (
                                <SelectItem key={animal.value} value={animal.value}>
                                    {animal.label}
                                </SelectItem>
                            ))}
                        </Select>


                        <Input size='sm' variant='bordered' className='mb-4' type="text" label="Buscar por codigo" />



                        <div className='flex justify-center'>
                            <Button onClick={updateQuery} size='lg'  className='bg-red-900 text-white w-full'>Buscar</Button>
                        </div>
                    </div>
                </div>
                <div className='col-span-9'>properties</div>

            </section>

        </main>
    )
}

export async function getServerSideProps({ query }: any) {
    const pageSize = query.limite || 10;
    const pageIndex = query.pagina || 1;
    const res = await http.get(`/property/previews?pageIndex=${pageIndex}&pageSize=${pageSize}`)
    const resObj = await res.data;
    const totalElements = resObj.count;
    const properties = resObj.rows;

    return { props: { properties: properties, page: pageIndex, limit: pageSize } }
}


