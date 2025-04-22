import { Flex } from '@chakra-ui/react';
import { useAuth } from '../../../../hooks/context/useAuth';
import type { ListPost } from '../../../../interfaces';
import { DeletePostButton } from './components/DeletePostButton';
import { PostContent } from './components/PostContent';
import { PostInfo } from './components/PostInfo';
import { PostLikes } from './components/PostLikes';

interface NewsItemProps {
  post: ListPost;
}

export const PostItem: React.FC<NewsItemProps> = ({ post }) => {
  const { isAuthenticated, user } = useAuth();

  const shouldShowDeleteButton = isAuthenticated && post.authorId === user?.id;

  return (
    <Flex
      p="5"
      borderWidth="1px"
      borderColor="gray.600"
      borderRadius="md"
      minW="200px"
      justifyContent="space-between"
      gap="2"
      overflow="hidden"
      bg="gray.700"
    >
      <Flex flexDir="column" width="100%">
        <Flex justifyContent="space-between" alignItems="center">
          <PostInfo post={post} />

          {shouldShowDeleteButton && <DeletePostButton post={post} />}
        </Flex>

        <PostContent postText={post.text} />

        <PostLikes post={post} />
      </Flex>
    </Flex>
  );
};
