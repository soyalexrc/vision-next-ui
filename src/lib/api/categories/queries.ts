import { Categories } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchCategories = async (): Promise<Categories[]> => {
  const { data } = await axios.get('/api/categories?isFeatured=true', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
