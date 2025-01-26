import { ExternalAdviser } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchExternalAdvisers = async (): Promise<ExternalAdviser[]> => {
  const { data } = await axios.get('/api/asesores-externos', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useExternalAdvisers = () =>
  useQuery({
    queryKey: ['externalAdvisers'],
    queryFn: fetchExternalAdvisers,
  });
