'use client';
import { SocialMediaLink } from '@prisma/client';
import Link from 'next/link';
import { SelectIcon } from '@/components/icons';
import React from 'react';
import { useSocialMediaLinks } from '@/lib/api/general/footer';

export default function SocialMediaHeader() {
  const { data, isPending } = useSocialMediaLinks();

  return (
    <div className="bg-red-100 flex justify-end items-center gap-4 py-2">
      {!isPending &&
        data &&
        data.map((item: SocialMediaLink) => (
          <Link key={item.id} href={item.href} target="_blank" className=" flex gap-2 items-center cursor-pointer" color="foreground">
            <SelectIcon icon={item.iconName} />
          </Link>
        ))}
    </div>
  );
}
