import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { BaseModal } from '../../../components/BaseModal';
import { Label } from '../../../components/Label';
import { TextInput } from '../../../components/TextInput';
import { useUpdateProfile } from '../../../hooks/api/useUpdateProfile';
import { useAuth } from '../../../hooks/context/useAuth';

interface UpdateProfileModalProps {
  onClose: () => void;
}

const UpdateProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
    .optional(),
  email: z.string().email('Deve ser um e-mail válido').optional(),
});

type IUpdateProfileFormData = z.infer<typeof UpdateProfileFormSchema>;

export const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  onClose,
}) => {
  const { user } = useAuth();
  const { mutate: updateProfile, isPending: isLoading } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateProfileFormData>({
    resolver: zodResolver(UpdateProfileFormSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  });

  const onSubmit = ({ email, name }: IUpdateProfileFormData) => {
    updateProfile(
      { email, name },
      {
        onSuccess: () => {
          toast.success('Perfil atualizado com sucesso!');
          onClose();
        },
        onError: () => {
          toast.error('Erro ao atualizar perfil!');
        },
      }
    );
  };

  return (
    <BaseModal onClickOutside={onClose}>
      <Flex flexDirection="column" p="6" gap="4" w="90vw" maxW="800px">
        <Avatar size="xl" name={user?.name} alignSelf="center" />

        <Label>
          <Text pb="6px" size="sm">
            Email
          </Text>
          <TextInput
            isRequired
            placeholder="Digite o seu email"
            type="email"
            {...register('email')}
          />

          {errors.email && (
            <Text color="red" size="sm">
              {errors.email.message}
            </Text>
          )}
        </Label>

        <Label>
          <Text pb="6px" size="sm">
            Nome
          </Text>
          <TextInput
            isRequired
            placeholder="Digite o seu nome"
            type="name"
            {...register('name')}
          />

          {errors.email && (
            <Text color="red" size="sm">
              {errors.email.message}
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
            Atualizar
          </Button>
        </Flex>
      </Flex>
    </BaseModal>
  );
};
