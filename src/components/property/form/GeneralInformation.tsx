import { GeneralInformation as Data } from '@/../prisma/prisma-client';

type Props = {
  data: Data;
};

export default function GeneralInformation({ data }: Props) {
  return <div>general information</div>;
}
