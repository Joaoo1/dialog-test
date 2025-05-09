import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ListPost } from '../../interfaces';
import { api } from '../../services/api';

interface ToggleLikeResponse {
  isLiked: boolean;
  postId: string;
  userId: string;
}

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  async function handler(postId: string) {
    const { data } = await api.post<ToggleLikeResponse>(
      `/posts/${postId}/like`
    );
    return data;
  }

  const mutation = useMutation({
    mutationFn: handler,
    onSuccess: ({ postId, isLiked }) => {
      const [query] = queryClient
        .getQueryCache()
        .findAll({ queryKey: ['posts'], exact: false });

      queryClient.setQueryData<ListPost[]>(query.queryKey, oldPosts => {
        if (!oldPosts) return [];

        return oldPosts.map(post => {
          if (post.id !== postId) return post;

          return {
            ...post,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1,
            likedByUser: isLiked,
          };
        });
      });
    },
  });

  return mutation;
};
