import { Box } from '@chakra-ui/react';

import { useActionOnEsc } from '../hooks/useActionOnEscPress';
import { useDisableScroll } from '../hooks/useDisableScroll';

interface IProps {
  onClickOutside: () => void;
  children: React.ReactNode;
  considerEscAsAnOutsideClick?: boolean;
}

export const BaseModal: React.FC<IProps> = ({ onClickOutside, children }) => {
  useDisableScroll();
  useActionOnEsc(onClickOutside);

  return (
    <Box
      onClick={onClickOutside}
      backgroundColor="rgba(0, 0, 0, 0.7)"
      width="100vw"
      height="100vh"
      position="fixed"
      inset={0}
      zIndex={9}
    >
      <Box
        onClick={e => {
          e.stopPropagation();
        }}
        overflowY="auto"
        background="gray.800"
        border="1px solid"
        borderColor="gray.600"
        borderRadius="md"
        zIndex={10}
        minWidth="300px"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        position="fixed"
      >
        {children}
      </Box>
    </Box>
  );
};
