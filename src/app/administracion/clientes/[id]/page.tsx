// import PropertyForm from '@/components/property/admin/PropertyForm';

import ClientForm from '@/components/clients/ClientForm';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetch(`${process.env.HOST_URL}/api/clientes/${params.id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return <ClientForm data={data} />;
}
