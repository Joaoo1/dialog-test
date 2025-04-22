import { Button, Flex, Text } from '@chakra-ui/react';
import { BaseModal } from './BaseModal';

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  onConfirm,
  title,
  description,
  isLoading = false,
}) => {
  return (
    <BaseModal onClickOutside={onClose}>
      <Flex flexDirection="column" p="6" gap="4" w="90vw" maxW="400px">
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>

        <Text fontSize="sm" color="gray.300">
          {description}
        </Text>

        <Flex justifyContent="flex-end" gap="2">
          <Button onClick={onClose} variant="outline" colorScheme="red">
            Cancelar
          </Button>
          <Button colorScheme="brand" onClick={onConfirm} isLoading={isLoading}>
            Confirmar
          </Button>
        </Flex>
      </Flex>
    </BaseModal>
  );
};
