import { Flex, Grid } from '@chakra-ui/react';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';
import { LeftContainer } from './components/LeftContainer';
import { RightContainer } from './components/RightContainer';
import { SearchContainer } from './components/SearchContainer';

interface Props {
  showSearchBar?: boolean;
}

export const Header: React.FC<Props> = ({ showSearchBar = true }) => {
  const headerHeight = useHeaderHeight();

  return (
    <Flex
      as="header"
      bg="gray.800"
      borderBottom="1px solid"
      borderColor="gray.500"
      position="fixed"
      width="100vw"
      minH={`${headerHeight}px`}
      zIndex={2}
      boxShadow="0px 5px 10px 1px rgba(0,0,0,0.3)"
      transition="0.4s"
      py="2"
    >
      <Grid
        gridTemplateColumns={{
          base: '1fr 1fr',
          sm: 'auto 2fr 1fr',
          md: '1fr 3fr 1fr',
        }}
        gridTemplateRows={{
          base: '',
        }}
        alignItems="center"
        width="100%"
        margin="0 auto"
        justifyContent="space-between"
        paddingInline={{ base: 3, md: 5, lg: 6 }}
        gap="5"
      >
        <LeftContainer />

        {showSearchBar ? <SearchContainer /> : <div />}

        <RightContainer />
      </Grid>
    </Flex>
  );
};
