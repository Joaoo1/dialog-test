import { Friend } from '../../types/User';
import { UserCard } from '../UserCard';

import { Container, Title } from './styles';

type Props = {
  title?: string;
  friends: Friend[];
};

export const FriendsList: React.FC<Props> = ({ title, friends }) => (
  <>
    <Title>{title}</Title>

    <Container>
      {friends.map(friend => (
        <UserCard user={friend} key={friend._id} />
      ))}
    </Container>
  </>
);
