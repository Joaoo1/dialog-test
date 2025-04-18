import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
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

const UpdateProfileFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Nome deve ter no mínimo 2 caracteres' })
      .optional(),
    email: z.string().email('Deve ser um e-mail válido').optional(),
    currentPassword: z.string().optional(),
    password: z
      .string()
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
      .regex(/[A-Z]/, { message: 'Ao menos uma letra maiúscula' })
      .regex(/[0-9]/, { message: 'Ao menos um número' })
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password, currentPassword }, ctx) => {
    if (!!currentPassword && !password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Nova senha é obrigatória quando a senha atual é informada',
        path: ['password'],
      });
    }

    if (!password) return;

    if (!confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message:
          'Confirmação de senha é obrigatória quando nova senha é informada',
        path: ['confirmPassword'],
      });
      return;
    }

    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
      });
    }
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

  const onSubmit = ({
    email,
    name,
    password,
    currentPassword,
  }: IUpdateProfileFormData) => {
    updateProfile(
      { email, name, password, currentPassword },
      {
        onSuccess: () => {
          toast.success('Perfil atualizado com sucesso!');
          onClose();
        },
        onError: err => {
          const message =
            err.response?.data?.message || 'Erro ao atualizar perfil';
          toast.error(message);
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

          {errors.name && (
            <Text color="red" size="sm">
              {errors.name.message}
            </Text>
          )}
        </Label>

        <Box borderTop="1px" borderColor="gray.500" my="4" />

        <Label>
          <Text pb="6px" size="sm">
            Senha atual
          </Text>
          <TextInput
            placeholder="Digite a senha atual"
            type="password"
            {...register('currentPassword')}
          />

          {errors.currentPassword && (
            <Text color="red" size="sm">
              {errors.currentPassword.message}
            </Text>
          )}
        </Label>

        <Label>
          <Text pb="6px" size="sm">
            Senha
          </Text>
          <TextInput
            placeholder="Digite a nova senha"
            type="password"
            {...register('password')}
          />

          {errors.password && (
            <Text color="red" size="sm">
              {errors.password.message}
            </Text>
          )}
        </Label>

        <Label>
          <Text pb="6px" size="sm">
            Confirmar Senha
          </Text>
          <TextInput
            placeholder="Confirme a nova senha"
            type="password"
            {...register('confirmPassword')}
          />

          {errors.confirmPassword && (
            <Text color="red" size="sm">
              {errors.confirmPassword.message}
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
            isDisabled={Object.keys(errors).length > 0}
          >
            Atualizar
          </Button>
        </Flex>
      </Flex>
    </BaseModal>
  );
};
