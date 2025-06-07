import { useQuery } from '@tanstack/react-query';
import { PropertyPreview } from '@/components/property/admin/table';
import { PropertyCardProps } from '@/components/PropertyCard';

const fetchProperties = async (adviserId = ''): Promise<PropertyPreview[]> => {
  const params = new URLSearchParams({
    pagina: '1',
    cantidad: '1000',
    status: 'todos',
    ...(adviserId && { asesor: adviserId }),
  });
  const url = `/api/inmuebles?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  const data = await response.json();
  return data.properties;
};

export const useProperties = (adviserId = '') =>
  useQuery({
    queryKey: ['properties'],
    enabled: false,
    queryFn: () => fetchProperties(adviserId),
  });

const fetchFeaturedProperties = async (): Promise<PropertyCardProps[]> => {
  const params = new URLSearchParams({
    destacado: 'true',
    pagina: '1',
    cantidad: '10',
  });
  const response = await fetch(`https://api.visioninmobiliaria.com.ve/api/v1/property/queried?${params.toString()}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch featured properties');
  }
  const data = await response.json();
  return data.data;
};

export const useFeaturedProperties = () =>
  useQuery({
    queryKey: ['featuredProperties'],
    queryFn: fetchFeaturedProperties,
  });
