import { Client } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchClients = async (): Promise<Client[]> => {
  const { data } = await axios.get('/api/clientes', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useClients = () => useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
});
