import { SearchBar } from '../../../components/SearchBar';
import { OnlyChildrenProps } from '../../../types/OnlyChildrenProps';

import { Content } from './styles';

export const DefaultLayout: React.FC<OnlyChildrenProps> = ({ children }) => (
  <>
    <SearchBar />
    <Content>{children}</Content>
  </>
);
