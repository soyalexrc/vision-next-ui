import PropertyForm from '@/components/property/admin/PropertyForm';
import { headers } from 'next/headers';

export default async function Page({ params }: { params: { id: string } }) {
  const host = headers().get('host') as string;
  const prefix = process.env.NODE_ENV !== 'production' ? 'http://' : 'https://';
  const data = await fetch(`${prefix + host}/api/inmuebles/${params.id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return <PropertyForm data={data} />;
}
