import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { PropertyPreview } from '@/components/property/admin/table';

const fetchProperties = async (adviserId = ''): Promise<PropertyPreview[]> => {
  const url = adviserId
    ? `/api/inmuebles?pagina=1&cantidad=1000&status=todos&asesor=${adviserId}`
    : '/api/inmuebles?pagina=1&cantidad=1000&status=todos';
  const { data } = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.properties;
};

export const useProperties = (adviserId = '') =>
  useQuery({
    queryKey: ['properties'],
    enabled: false,
    queryFn: () => fetchProperties(adviserId),
  });

const fetchFeaturedProperties = async (): Promise<PropertyPreview[]> => {
  const { data } = await axios.get('/api/inmuebles?pagina=1&cantidad=1000&status=true&destacado=true', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.properties;
};

export const useFeaturedProperties = () =>
  useQuery({
    queryKey: ['featuredProperties'],
    queryFn: fetchFeaturedProperties,
  });
