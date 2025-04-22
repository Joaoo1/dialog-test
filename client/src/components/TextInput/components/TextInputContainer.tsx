import { Flex, type FlexProps } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

export const TextInputContainer: React.FC<FlexProps & PropsWithChildren> = ({
  children,
  ...flexProps
}) => (
  <Flex
    {...flexProps}
    alignItems="center"
    backgroundColor="gray.700"
    padding="10px 16px"
    borderRadius="6px"
    border="1px solid"
    borderColor="gray.500"
    boxSizing="border-box"
    sx={{
      '&:has(input:focus)': {
        borderColor: 'brand.300',
      },
      '&:has(input:disabled)': { opacity: 0.5, cursor: 'not-allowed' },
    }}
  >
    {children}
  </Flex>
);
