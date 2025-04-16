import { Flex, Text } from '@chakra-ui/react';
import { useSearchParams } from 'react-router';
import { Loading } from '../../../components/Loading';
import { useFetchPosts } from '../../../hooks/api/useFetchPosts';
import { useHeaderHeight } from '../hooks/useHeaderHeight';
import { PostItem } from './PostItem';

export const PostsList: React.FC = () => {
  const headerHeight = useHeaderHeight();

  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const { data: posts = [], isLoading, error } = useFetchPosts({ search });

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
      {renderList()}
    </Flex>
  );
};
