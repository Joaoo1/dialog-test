import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MdArrowUpward } from 'react-icons/md';
import { useSearchParams } from 'react-router';
import { Loading } from '../../../components/Loading';
import { useFetchPosts } from '../../../hooks/api/useFetchPosts';
import { useAuth } from '../../../hooks/context/useAuth';
import { useHeaderHeight } from '../../../hooks/useHeaderHeight';
import type { ListPost } from '../../../interfaces';
import { WebSocketEvents, socket } from '../../../services/socket';
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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNewPostButtonClick = async () => {
    await refetch();
    setHasNewPosts(false);
    handleScrollToTop();
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
        <Button
          color="white"
          colorScheme="brand"
          position="fixed"
          bg="brand.500"
          left="50%"
          transform="translateX(-50%)"
          zIndex="100"
          px="4"
          py="2"
          borderRadius="full"
          alignItems="center"
          gap="2"
          mt="-5px"
          onClick={handleNewPostButtonClick}
        >
          {isFetching ? (
            <Spinner size="sm" colorScheme="brand" />
          ) : (
            <MdArrowUpward size={20} />
          )}

          <Text>Novas postagens</Text>
        </Button>
      )}

      {renderList()}
    </Flex>
  );
};
