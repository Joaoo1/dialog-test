import { Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router';
import fullLogo from '../../../assets/full-logo.png';
import logo from '../../../assets/logo.svg';

export const LeftContainer: React.FC = () => {
  return (
    <Box order={0}>
      <Link to="/">
        <Image
          src={fullLogo}
          maxW="100px"
          display={{ base: 'none', lg: 'block' }}
        />
        <Image src={logo} maxW="50px" display={{ base: 'block', lg: 'none' }} />
      </Link>
    </Box>
  );
};
