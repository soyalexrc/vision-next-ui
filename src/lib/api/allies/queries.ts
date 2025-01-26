import { Ally } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchAllies = async (): Promise<Ally[]> => {
  const { data } = await axios.get('/api/aliados', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useAllies = () =>
  useQuery({
    queryKey: ['allies'],
    queryFn: fetchAllies,
  });
