import { Box, Image } from '@chakra-ui/react';
import fullLogo from '../../../../../assets/full-logo.png';
import logo from '../../../../../assets/logo.svg';

export const LeftContainer: React.FC = () => {
  return (
    <Box order={0}>
      <Image
        src={fullLogo}
        maxW="100px"
        display={{ base: 'none', lg: 'block' }}
      />
      <Image src={logo} maxW="50px" display={{ base: 'block', lg: 'none' }} />
    </Box>
  );
};
