import { useQuery } from '@tanstack/react-query';
import { getAgents } from '@/lib/firestore';
import { Agent } from '@/lib/types';

export const useAgents = () => {
  return useQuery<Agent[]>({
    queryKey: ['agents'],
    queryFn: async () => {
      try {
        return await getAgents();
      } catch (error) {
        console.error("Error fetching agents:", error);
        return [] as Agent[]; // Graceful fallback
      }
    },
    staleTime: 60 * 1000,
    retry: 2, // Only retry twice before falling back
  });
};
