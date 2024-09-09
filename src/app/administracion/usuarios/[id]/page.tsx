import UserForm from '@/components/users/UserForm';

export default async function Page({ params }: { params: { id: string } }) {
  const user = await fetch(`${process.env.HOST_URL}/api/usuarios/${params.id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log(user);

  return <UserForm data={user} />;
}
