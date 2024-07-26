import { TiktokIcon, InstagramIcon, MailIcon, MapPointIcon, FacebookIcon, WhatsappIcon } from '@/components/icons';

type Item = Record<string, JSX.Element>;

const items: Item = {
  tiktok: <TiktokIcon width={25} height={25} fill="rgb(97, 3, 33)" />,
  instagram: <InstagramIcon width={25} height={25} fill="rgb(97, 3, 33)" />,
  email: <MailIcon width={25} height={25} fill="rgb(97, 3, 33)" />,
  mappoint: <MapPointIcon width={25} height={25} fill="rgb(97, 3, 33)" />,
  facebook: <FacebookIcon width={25} height={25} fill="rgb(97, 3, 33)" />,
  whatsapp: <WhatsappIcon width={25} height={25} fill="rgb(97, 3, 33)" />,
};

export function SelectIcon({ icon }: { icon: string }) {
  return items[icon];
}
