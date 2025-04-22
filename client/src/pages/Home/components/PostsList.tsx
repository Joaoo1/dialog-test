import { Flex, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Loading } from '../../../components/Loading';
import { useFetchPosts } from '../../../hooks/api/useFetchPosts';
import { useAuth } from '../../../hooks/context/useAuth';
import { useHeaderHeight } from '../../../hooks/useHeaderHeight';
import type { ListPost } from '../../../interfaces';
import { WebSocketEvents, socket } from '../../../services/socket';
import { NewPostsButton } from './NewPostsButton';
import { PostItem } from './PostItem';

interface LikeSocketData {
  userId: string;
  postId: string;
  isLiked: boolean;
}

interface NewPostSocketData {
  authorId: string;
}

export const PostsList: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const headerHeight = useHeaderHeight();
  const [hasNewPosts, setHasNewPosts] = useState(false);

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const {
    data: posts = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useFetchPosts({ search });

  useEffect(() => {
    socket.on(WebSocketEvents.NEW_POST, handleNewPostSocketEvent);

    socket.on(WebSocketEvents.LIKE_POST, handleLikeSocketEvent);

    socket.connect();

    return () => {
      socket.off(WebSocketEvents.NEW_POST, handleNewPostSocketEvent);
      socket.off(WebSocketEvents.LIKE_POST, handleLikeSocketEvent);
      socket.disconnect();
    };
  }, []);

  const handleLikeSocketEvent = ({
    userId,
    postId,
    isLiked,
  }: LikeSocketData) => {
    if (user?.id === userId) return;

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
        };
      });
    });
  };

  const handleNewPostSocketEvent = ({ authorId }: NewPostSocketData) => {
    setHasNewPosts(user?.id !== authorId);
  };

  const renderList = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return (
        <Text textAlign="center" fontSize="2xl" w="100%" mt="10">
          Ocorreu um erro ao buscar postagens.
        </Text>
      );
    }

    if (posts.length === 0) {
      return (
        <Text textAlign="center" fontSize="2xl" w="100%" mt="10">
          Nenhum postagem encontrada.
        </Text>
      );
    }

    return posts.map(item => <PostItem key={item.id} post={item} />);
  };

  const handleNewPostButtonClick = async () => {
    await refetch();
    setHasNewPosts(false);
  };

  return (
    <Flex
      flexDir="column"
      maxW="800px"
      width="100%"
      marginInline="auto"
      gap="6"
      paddingInline="4"
      pb="10"
      mt={{ base: `${headerHeight + 70}px`, sm: `${headerHeight + 20}px` }}
    >
      {hasNewPosts && (
        <NewPostsButton
          isFetching={isFetching}
          onClick={handleNewPostButtonClick}
        />
      )}

      {renderList()}
    </Flex>
  );
};
