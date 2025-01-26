import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { PropertyPreview } from '@/components/property/admin/table';

const fetchProperties = async (): Promise<PropertyPreview[]> => {
  const { data } = await axios.get('/api/inmuebles?pagina=1&cantidad=1000', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.properties;
};

export const useProperties = () =>
  useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });
