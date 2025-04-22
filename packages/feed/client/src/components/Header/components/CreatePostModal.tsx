import { Button, Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useCreatePost } from '../../../hooks/api/useCreatePost';
import { BaseModal } from '../../BaseModal';
import { Label } from '../../Label';
import { TextInput } from '../../TextInput';

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostFormSchema = z.object({
  text: z
    .string()
    .nonempty('Texto é obrigatório')
    .max(1000, 'Máximo 1000 caracteres'),
});

type ICreatePostFormData = z.infer<typeof CreatePostFormSchema>;

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  onClose,
}) => {
  const { mutate: createPost, isPending: isLoading } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICreatePostFormData>({
    resolver: zodResolver(CreatePostFormSchema),
  });

  const onSubmit = ({ text }: ICreatePostFormData) => {
    createPost(
      { text },
      {
        onSuccess: () => {
          toast.success('Postagem criada com sucesso!');
          onClose();
        },
        onError: () => {
          toast.error('Erro ao adicionar postagem!');
        },
      }
    );
  };

  return (
    <BaseModal onClickOutside={onClose}>
      <Flex flexDirection="column" p="6" gap="4" w="90vw" maxW="800px">
        <Text fontSize="lg" fontWeight="bold">
          Adicionar postagem
        </Text>
        <Label>
          <Text pb="6px" size="sm">
            Conteúdo
          </Text>
          <TextInput
            as="textarea"
            maxLength={1000}
            isRequired
            placeholder="Digite o conteúdo da postagem"
            type="text"
            {...register('text')}
          />

          {errors.text && (
            <Text color="red" size="sm">
              {errors.text.message}
            </Text>
          )}
        </Label>

        <Flex justifyContent="flex-end" gap="2">
          <Button onClick={onClose} variant="outline" colorScheme="red">
            Cancelar
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting || isLoading}
          >
            Postar
          </Button>
        </Flex>
      </Flex>
    </BaseModal>
  );
};
