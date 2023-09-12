import {Inter} from 'next/font/google'
import {Button} from '@nextui-org/react'
import {http} from "@/utils/axios";
import { useRouter } from 'next/router';


const inter = Inter({subsets: ['latin']})

export default function Home({ properties, page, limit }: any) {
    const router = useRouter();

    // Call this function whenever you want to
    // refresh props!
    const refreshData = () => {
        router.replace(router.asPath);
    }

    const updateQuery = (newQuery: string) => {
        router.push({
            pathname: '/propiedades',
            query: { page: encodeURI(newQuery), limit: 10 },
        });
    };

    console.log(properties);
    console.log(page);
    console.log(limit);

    return (
        <main
            className={`flex  min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >

            <button onClick={() => updateQuery('2')}>search next page</button>
        </main>
    )
}

export async function getServerSideProps({ query }: any) {
    const pageSize = query.limit || 10;
    const pageIndex = query.page || 1;
    const res = await http.get(`/property/previews?pageIndex=${pageIndex}&pageSize=${pageSize}`)
    const resObj = await res.data;
    const totalElements = resObj.count;
    const properties = resObj.rows;

    return { props: { properties: properties, page: pageIndex, limit: pageSize } }
}


