import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 1.5rem;
`;

const Title = styled.h2`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export { Container, Title };
