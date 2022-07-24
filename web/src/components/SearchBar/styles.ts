import styled from 'styled-components';

const Container = styled.header`
  background-color: var(--gray-900);
  padding: 0.75rem 0;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 1340px;
  margin: 0 auto;
  padding-inline: 30px;

  a {
    text-decoration: none;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--white-900);
`;

const SearchInput = styled.input`
  border-radius: 25px;
  padding: 10px 8px;
  border: none;
  max-width: 36rem;
  width: 100%;
  background-color: var(--gray-800);
  padding-left: 1rem;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--gray-400);
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: red;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: red;
  }
`;

export { Container, Content, Title, SearchInput };
