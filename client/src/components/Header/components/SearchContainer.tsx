import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDebounce } from '../../../hooks/useDebounce';
import { TextInput } from '../../TextInput';

export const SearchContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setSearchParams({ search: debouncedSearchQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchQuery, setSearchParams]);

  return (
    <Flex
      justifyContent="center"
      order={{ base: 2, sm: 'unset' }}
      gridColumn={{ base: 'span 2', sm: 'unset' }}
    >
      <TextInput
        flex="1"
        placeholder="Pesquisar posts"
        onChange={e => setSearchQuery(e.currentTarget.value)}
        maxW="500px"
      />
    </Flex>
  );
};
