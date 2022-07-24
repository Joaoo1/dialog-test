import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container, Content, SearchInput, Title } from './styles';

export const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      if (e.target.value) {
        navigate(`/?q=${e.target.value}`);
        return;
      }

      navigate(`/`);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setQuery(e.target.value);
  };

  return (
    <Container>
      <Content>
        <Link to="/" onClick={() => setQuery('')}>
          <Title>MySocial</Title>
        </Link>
        <SearchInput
          placeholder="Search"
          onKeyUp={handleKeyDown}
          onChange={handleChange}
          value={query}
        />
      </Content>
    </Container>
  );
};
