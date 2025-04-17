import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '../../interfaces';
import { api } from '../../services/api';

interface UpdateProfileData {
  name?: string;
  email?: string;
}

interface UpdateProfileResponse {
  user: User;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  async function handler(data: UpdateProfileData) {
    const response = await api.put<UpdateProfileResponse>('/users', data);
    return response.data;
  }

  return useMutation({
    mutationFn: handler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'user-profile',
      });
    },
  });
};
