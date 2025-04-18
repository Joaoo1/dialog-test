import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultApiError, User } from '../../interfaces';
import { api } from '../../services/api';

interface UpdateProfileData {
  name?: string;
  email?: string;
  currentPassword?: string;
  password?: string;
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

  return useMutation<
    UpdateProfileResponse,
    AxiosError<DefaultApiError>,
    UpdateProfileData
  >({
    mutationFn: handler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'user-profile',
      });
    },
  });
};
