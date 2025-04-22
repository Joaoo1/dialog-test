import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { IoPersonCircle } from 'react-icons/io5';
import type { ListPost } from '../../../../../interfaces';
import {
  formatDate,
  formatToHumanFriendlyDate,
} from '../../../../../utils/formatDate';

interface Props {
  post: ListPost;
}

export const PostInfo: React.FC<Props> = ({ post }) => {
  return (
    <Flex>
      <Icon as={IoPersonCircle} color="gray.400" mr="2" boxSize="48px" />

      <Box>
        <Text fontWeight="bold">{post.authorName}</Text>
        <Text fontSize="sm" color="gray.400" title={formatDate(post.createdAt)}>
          {formatToHumanFriendlyDate(post.createdAt)}
        </Text>
      </Box>
    </Flex>
  );
};
