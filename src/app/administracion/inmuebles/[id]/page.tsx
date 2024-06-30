import PropertyForm from '@/components/property/form/PropertyForm';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetch(`http://localhost:3000/api/inmuebles/${params.id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return <PropertyForm data={data} />;
}
