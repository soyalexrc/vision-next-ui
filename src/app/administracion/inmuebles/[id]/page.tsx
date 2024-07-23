import PropertyForm from '@/components/property/admin/PropertyForm';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetch(`${process.env.HOST_URL}/api/inmuebles/${params.id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  const attributes = await fetch(`${process.env.HOST_URL}/api/inmuebles/attributes/getAll`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return <PropertyForm data={data} attributes={attributes} />;
}
