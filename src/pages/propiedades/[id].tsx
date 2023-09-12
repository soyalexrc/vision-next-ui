import {Inter} from 'next/font/google'
import {Button} from '@nextui-org/react'
import {http} from "@/utils/axios";



export default function Property({property}: any) {

    return (
        <main
            className={`flex  min-h-screen flex-col items-center justify-between p-24 `}
        >
            {property && property.images && property.images.length  > 0 &&property.images.map((image: string) => (
                <img key={image} src={image} alt=""/>
            ))}
        </main>
    )
}

export async function getStaticPaths() {
    const res = await http.get('/property/previews?pageIndex=1&pageSize=10');
    const properties = await res.data.rows;

    const paths = properties.map((property: any) => ({
        params: {id: property.id.toString()}
    }))

    console.log(paths);

    return { paths, fallback: 'blocking' };

}


export async function getStaticProps({ params }: any) {
    const res = await http.get(`/property/${params.id}`);
    const finalProperty = await res.data;

    return { props: { property: finalProperty, revalidate: 60 } }
}


