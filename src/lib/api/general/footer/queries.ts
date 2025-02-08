import { SocialMediaLink } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchSocialMediaLinks = async (): Promise<SocialMediaLink[]> => {
  const { data } = await axios.get('/api/socialMedia', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const useSocialMediaLinks = () =>
  useQuery({
    queryKey: ['socialMediaLinks'],
    queryFn: fetchSocialMediaLinks,
  });
