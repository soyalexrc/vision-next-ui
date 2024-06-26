
type Props = {
  data: string[];
}

export default function VisualsInformation({data}: Props) {
  return <div>{JSON.stringify(data, null, 2)}</div>;
}
