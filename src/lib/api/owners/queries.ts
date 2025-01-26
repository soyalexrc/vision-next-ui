import { Owner } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchOwners = async (): Promise<Owner[]> => {
  const { data } = await axios.get('/api/propietarios', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useOwners = () =>
  useQuery({
    queryKey: ['owners'],
    queryFn: fetchOwners,
  });
