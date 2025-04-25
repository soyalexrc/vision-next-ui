import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchAllUsers = async (): Promise<any[]> => {
  const { data } = await axios.get('/api/usuarios', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
  });
