import { Container } from './styles';

type User = {
  _id: string;
  name: string;
  age: number;
  eyeColor: string;
  company: string;
  email: string;
  picture: string;
};

type Props = {
  user: User;
  navigateToProfileOnClick?: boolean;
};

export const UserCard: React.FC<Props> = ({
  user,
  navigateToProfileOnClick,
}) => (
  <Container
    isClickable={!!navigateToProfileOnClick}
    to={navigateToProfileOnClick ? `/${user._id}` : '#'}
  >
    <img src={user.picture} alt={`Imagem de perfil do usuário ${user.name}`} />
    <p>Name: {user.name}</p>
    <p>Age: {user.age}</p>
    <p>Eye color: {user.eyeColor}</p>
    <p>Company: {user.company}</p>
    <p>E-mail: {user.email}</p>
  </Container>
);
