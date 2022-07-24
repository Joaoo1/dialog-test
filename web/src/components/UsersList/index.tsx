import { User } from '../../types/User';
import { UserCard } from '../UserCard';

import { Container } from './styles';

type Props = {
  title?: string;
  users: User[];
};

export const UsersList: React.FC<Props> = ({ users }) => (
  <Container>
    {users.map(user => (
      <UserCard user={user} key={user._id} navigateToProfileOnClick />
    ))}
  </Container>
);
