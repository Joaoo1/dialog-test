import { Button, Spinner, Text } from '@chakra-ui/react';
import { MdArrowUpward } from 'react-icons/md';

interface Props {
  isFetching: boolean;
  onClick: () => void;
}

export const NewPostsButton: React.FC<Props> = ({ isFetching, onClick }) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNewPostButtonClick = () => {
    onClick();
    handleScrollToTop();
  };

  return (
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
  );
};
