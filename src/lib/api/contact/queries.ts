import { ContactForm} from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchContactForms = async (): Promise<ContactForm[]> => {
  const { data } = await axios.get('/api/contacto', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useContactForms = () =>
  useQuery({
    queryKey: ['contactForms'],
    queryFn: fetchContactForms,
  });
