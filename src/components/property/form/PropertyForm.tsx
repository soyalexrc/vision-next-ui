'use client';
import { Button } from '@/components/ui/button';
import { createProperty } from '@/actions/property';
import { toast } from 'sonner';

export default function PropertyForm() {
  async function handleCreateProperty() {
    const { message } = await createProperty();
    toast.success(message);
  }

  return (
    <div>
      <Button onClick={handleCreateProperty}>Seed property</Button>
    </div>
  );
}
