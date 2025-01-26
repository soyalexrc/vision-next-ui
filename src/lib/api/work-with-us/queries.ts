import { WorkWithUsForm } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchWorkWithUs = async (): Promise<WorkWithUsForm[]> => {
  const { data } = await axios.get('/api/trabaja-con-nosotros', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useWorkWithUs = () =>
  useQuery({
    queryKey: ['workWithUs'],
    queryFn: fetchWorkWithUs,
  });
