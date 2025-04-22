import { Text } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export const Label: React.FC<PropsWithChildren> = ({ children }) => (
	<Text as="label" fontSize="sm" display="flex" flexDirection="column" gap={1}>
		{children}
	</Text>
);
