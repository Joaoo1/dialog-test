import {
	Input as ChakraInput,
	InputGroup,
	type InputProps,
	InputRightElement,
	Spinner,
} from '@chakra-ui/react';

type Props = InputProps & { isLoading?: boolean };

export const Input: React.FC<Props> = ({ isLoading, ...inputProps }) => {
	if (inputProps.as === 'textarea') {
		return (
			<ChakraInput
				{...inputProps}
				as="textarea"
				rows={4}
				fontFamily="default"
				fontSize="sm"
				color="white"
				background="transparent"
				border="none"
				width="100%"
				variant="unstyled"
				_focus={{ outline: 0 }}
				_disabled={{ cursor: 'not-allowed' }}
				_placeholder={{ color: 'gray.400' }}
			/>
		);
	}

	return (
		<InputGroup>
			<ChakraInput
				{...inputProps}
				fontFamily="default"
				fontSize="sm"
				color="white"
				background="transparent"
				border="none"
				width="100%"
				variant="unstyled"
				_focus={{ outline: 0 }}
				_disabled={{ cursor: 'not-allowed' }}
				_placeholder={{ color: 'gray.400' }}
			/>
			{isLoading && (
				<InputRightElement p="0" height="auto">
					<Spinner size="sm" mt="1" mr="-16px" />
				</InputRightElement>
			)}
		</InputGroup>
	);
};
