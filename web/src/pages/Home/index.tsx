import { gql, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

import { LoadingIndicator } from '../../components/LoadingIndicator';
import { UserNotFound } from '../../components/UserNotFound';
import { UsersList } from '../../components/UsersList';
import { User } from '../../types/User';

const GET_USERS = gql`
  query GetUsers($name: String) {
    list(name: $name) {
      id
      picture
      age
      eyeColor
      name
      company
      email
    }
  }
`;

type UserData = { list: User[] };

type UserVars = { name: string };

export const Home: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('q');

  const { loading, data } = useQuery<UserData, UserVars>(GET_USERS, {
    variables: { name: query || '' },
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!data || data.list.length === 0) {
    return <UserNotFound title="No results found" />;
  }

  return <UsersList users={data.list} />;
};
