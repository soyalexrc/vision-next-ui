import { DocumentsInformation as Data } from '@/../prisma/prisma-client';

type Props = {
  data: Data;
  files: string[]
};

export default function DocumentsInformation({data}: Props) {
  return <div>documents information</div>;
}
