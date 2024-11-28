import { LoadingState } from '@/components/LoadingState';

export default function Loading() {
  return (
    <div>
      <LoadingState columns={1} className="mb-8" />
      <LoadingState columns={1} className="mb-8" />
      <LoadingState columns={1} className="mb-8" />
      <LoadingState columns={1} className="mb-8" />
      <LoadingState columns={1} className="mb-8" />
      <LoadingState columns={1} className="mb-8" />
    </div>
  );
}
