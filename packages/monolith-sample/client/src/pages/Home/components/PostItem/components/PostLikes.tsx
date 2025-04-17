import { Flex, IconButton, Text } from '@chakra-ui/react';
import { BiLike } from 'react-icons/bi';
import { useToggleLike } from '../../../../../hooks/api/useToggleLike';
import { useAuth } from '../../../../../hooks/context/useAuth';
import type { ListPost } from '../../../../../interfaces';

interface Props {
  post: ListPost;
}

export const PostLikes: React.FC<Props> = ({ post }) => {
  const { isAuthenticated } = useAuth();

  const { mutate: toggleLike, isPending } = useToggleLike();

  const handleLike = () => {
    toggleLike(post.id);
  };

  const likesText = post.likesCount === 1 ? 'like' : 'likes';

  return (
    <Flex
      gap="2"
      borderTop="1px solid"
      borderColor="gray.500"
      pt="4"
      mt="2"
      alignItems="center"
    >
      {isAuthenticated && (
        <IconButton
          cursor="pointer"
          aria-label="Dar like"
          variant="ghost"
          colorScheme="whiteAlpha"
          as={BiLike}
          boxSize="32px"
          onClick={handleLike}
          color={post.likedByUser ? 'brand.500' : 'gray.300'}
          isLoading={isPending}
          p="1"
        />
      )}
      <Text color="gray.200">
        {post.likesCount} {likesText}
      </Text>
    </Flex>
  );
};
