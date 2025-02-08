'use client';

import { useSocialMediaLinks } from '@/lib/api/general/footer';
import Link from 'next/link';
import { SelectIcon } from '@/components/icons';

export default function SocialMediaBar() {
  const { data, isPending } = useSocialMediaLinks();

  return (
    <div className="flex justify-center items-center gap-4 py-2">
      {!isPending &&
        data &&
        data.map((item) => (
          <Link key={item.id} href={item.href} target="_blank" className=" flex gap-4 items-center cursor-pointer" color="foreground">
            <SelectIcon icon={item.iconName} size={30} />
          </Link>
        ))}
    </div>
  );
}
