import { Container } from './styles';

type User = {
  name: string;
  age: number;
  email: string;
  picture: string;
};

type Props = { user: User };

export const ProfileInfo: React.FC<Props> = ({ user }) => (
  <Container>
    <img src={user.picture} alt={`Imagem de perfil do usuário ${user.name}`} />
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  </Container>
);
