import { UserNotFoundTitle, UserNotFoundText } from './styles';

type Props = {
  title: string;
  text?: string;
};

export const UserNotFound: React.FC<Props> = ({ title, text }) => (
  <>
    <UserNotFoundTitle>{title}</UserNotFoundTitle>
    <UserNotFoundText>{text}</UserNotFoundText>
  </>
);
