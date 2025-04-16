import { Box, Flex } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const l27 = keyframes`
  100% { transform: rotate(1turn); }
`;

export const Loading: React.FC = () => (
	<Flex justifyContent="center" mt="100px">
		<Box
			width="4px"
			height="4px"
			borderRadius="100%"
			color="brand.500"
			sx={{
				'--d': '22px',
				boxShadow: `
        calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
        calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
        calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
        calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
        calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
        calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
        calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px
      `,
				animation: `${l27} 1s infinite steps(8)`,
			}}
		/>
	</Flex>
);
