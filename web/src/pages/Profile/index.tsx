import { gql, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import { FriendsList } from '../../components/FriendsList';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { ProfileInfo } from '../../components/ProfileInfo';
import { UserNotFound } from '../../components/UserNotFound';
import { User } from '../../types/User';

const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    find(id: $id) {
      id
      index
      picture
      age
      eyeColor
      name
      company
      email
      friends {
        id
        index
        picture
        age
        eyeColor
        name
        company
        email
      }
      greeting
    }
  }
`;

type UserData = { find: User };

type UserVars = { id: string };

export const Profile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useQuery<UserData, UserVars>(GET_USER_BY_ID, {
    variables: { id: id! },
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data || !data.find) {
    setTimeout(() => navigate('/'), 20000);
    return (
      <UserNotFound
        title="Usuário não encontrado"
        text="Você será redirecionado para página inicial em 20 segundos"
      />
    );
  }

  return (
    <>
      <ProfileInfo user={data.find} />
      <FriendsList title="Friends:" friends={data.find.friends || []} />
    </>
  );
};
