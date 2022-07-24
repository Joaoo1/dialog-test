import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    max-width: 10rem;
    width: 40%;
  }

  p + p {
    margin-top: 0.5rem;
    font-size: 1.1rem;
  }

  p:last-child {
    word-break: break-all;
  }
`;
