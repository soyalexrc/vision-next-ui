import {Button} from "@nextui-org/react";

const elements = [
    {
        id: '1',
        img: '/home/latestElements/latest-1.jpg'
    },
    {
        id: '2',
        img: '/home/latestElements/latest-2.jpg'
    },
    {
        id: '3',
        img: '/home/latestElements/latest-3.jpg'
    },
    {
        id: '4',
        img: '/home/latestElements/latest-4.jpg'
    },
    {
        id: '5',
        img: '/home/latestElements/latest-5.jpg'
    },
    {
        id: '6',
        img: '/home/latestElements/latest-6.jpg'
    },
    {
        id: '7',
        img: '/home/latestElements/latest-7.jpg'
    },
    {
        id: '8',
        img: '/home/latestElements/latest-8.jpg'
    },
    {
        id: '9',
        img: '/home/latestElements/latest-9.jpg'
    },
]

export default function FeaturedProperties () {
    return (
        <section className='lg:px-24'>
            <h2 className='text-2xl font-bold lg:font-medium lg:text-4xl py-10 text-center'>Conoce las propiedades que tenemos para ti</h2>
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 grid-rows-3">
              {
                elements.map((element) => (
                    <PropertyCard img={element.img} key={element.id} />
                ))
            }
            </div>

            <div className='flex justify-center mt-10'>
                <Button size='lg' className='bg-red-900 text-white w-[300px]'>Ver mas</Button>
            </div>

        </section>
    )
}

function PropertyCard(props: { img: string }) {
    return (
        <div>
            <img className='h-[220px] w-[420px] object-cover' src={props.img} alt=""/>
            <div className='bg-gray-100 p-6 '>
                <h5 className='text-xl hover:underline cursor-pointer mb-5'>Piso con terraza en avenida de castilla</h5>
                <div className='flex gap-5 justify-center '>
                    <small>86 m2</small>
                    <small className='border-x-1 border-gray-400 px-4'>3 Habitaciones</small>
                    <small>1 Bano</small>
                </div>
                <p className='text-red-900 text-center mt-5 text-4xl'>$ 295.000</p>
            </div>
        </div>
    )
}
