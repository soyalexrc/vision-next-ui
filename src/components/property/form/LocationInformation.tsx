import { LocationInformation as Data } from '@/../prisma/prisma-client';

type Props = {
  data: Data;
};


export default function LocationInformation({data}: Props) {
  return <div>location information</div>;
}
