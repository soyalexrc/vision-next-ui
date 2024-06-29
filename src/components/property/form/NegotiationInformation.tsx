import { NegotiationInfomation as Data } from '@/../prisma/prisma-client';

type Props = {
  data: Data;
};

export default function NegotiationInformation({ data }: Props) {
  return <div>negotiation information</div>;
}
