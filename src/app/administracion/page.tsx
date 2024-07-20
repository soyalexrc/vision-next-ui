import { headers } from 'next/headers';

export default function Page() {
  const host = headers().get('host') as string;
  const prefix = process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
  console.log(prefix, host);
  return <div>admin page {prefix + host}</div>;
}
