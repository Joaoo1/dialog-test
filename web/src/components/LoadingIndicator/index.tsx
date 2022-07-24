import { Container, Spinner } from './styles';

export const LoadingIndicator: React.FC = () => (
  <Container>
    <Spinner>
      <div />
      <div />
      <div />
      <div />
    </Spinner>
  </Container>
);
