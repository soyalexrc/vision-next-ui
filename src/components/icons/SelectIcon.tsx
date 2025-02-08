import { TiktokIcon, InstagramIcon, MailIcon, MapPointIcon, FacebookIcon, WhatsappIcon } from '@/components/icons';

type Item = (size: number) => JSX.Element;

const items: Record<string, Item> = {
  tiktok: (size) => <TiktokIcon width={size} height={size} fill="rgb(97, 3, 33)" />,
  instagram: (size) => <InstagramIcon width={size} height={size} fill="rgb(97, 3, 33)" />,
  email: (size) => <MailIcon width={size} height={size} fill="rgb(97, 3, 33)" />,
  mappoint: (size) => <MapPointIcon width={size} height={size} fill="rgb(97, 3, 33)" />,
  facebook: (size) => <FacebookIcon width={size} height={size} fill="rgb(97, 3, 33)" />,
  whatsapp: (size) => <WhatsappIcon width={size} height={size} fill="rgb(97, 3, 33)" />,
};

export function SelectIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  return items[icon] ? items[icon](size) : null;
}
