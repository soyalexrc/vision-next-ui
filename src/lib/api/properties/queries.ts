import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { PropertyPreview } from '@/components/property/admin/table';
import { PropertyCardProps } from '@/components/PropertyCard';

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

const fetchFeaturedProperties = async (): Promise<PropertyCardProps[]> => {
  const { data } = await axios.get('https://api.visioninmobiliaria.com.ve/api/v1/property/featured', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.data;
};

export const useFeaturedProperties = () =>
  useQuery({
    queryKey: ['featuredProperties'],
    queryFn: fetchFeaturedProperties,
  });
