import { Flex } from '@chakra-ui/react';
import { Header } from './components/Header';
import { PostsList } from './components/PostsList';

export const Home: React.FC = () => {
  return (
    <Flex flexDir="column">
      <Header />

      <PostsList />
    </Flex>
  );
};
