import { Button, Checkbox, Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdArrowForward } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { Label } from '../../../components/Label';
import { TextInput } from '../../../components/TextInput';
import { useSignUp } from '../../../hooks/api/useSignUp';

const signUpFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Este campo é obrigatório' }),
    email: z
      .string()
      .email('Deve ser um e-mail válido')
      .min(1, { message: 'Este campo é obrigatório' }),
    password: z
      .string()
      .min(6, { message: 'Senha deve conter no mínimo 6 caracteres' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Senha deve conter no mínimo 6 caracteres' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas não coincidem',
        path: ['confirmPassword'],
      });
    }
  });

type ISignUpFormData = z.infer<typeof signUpFormSchema>;

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpFormData>({
    resolver: zodResolver(signUpFormSchema, { async: false }),
  });

  const { mutate: signUp, isPending: isSigningUp } = useSignUp({
    onSuccess: () => {
      toast.success('Cadastro realizado com sucesso!');
      goBack();
    },
    onError: error => {
      const message = error.response?.data.message || 'Erro ao cadastrar';
      toast.error(message);
    },
  });

  const onSubmit = (data: ISignUpFormData) => {
    signUp({ email: data.email, password: data.password, name: data.name });
  };

  return (
    <Flex
      as="form"
      mt={6}
      flexDirection="column"
      gap={5}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label>
        <Text pb="6px" size="sm">
          Nome
        </Text>
        <TextInput
          isRequired
          type="nome"
          placeholder="Digite seu nome"
          {...register('name')}
        />

        {errors.name && (
          <Text color="red" size="sm">
            {errors.name.message}
          </Text>
        )}
      </Label>

      <Label>
        <Text pb="6px" size="sm">
          Email
        </Text>
        <TextInput
          isRequired
          type="email"
          placeholder="Digite seu email"
          {...register('email')}
        />

        {errors.email && (
          <Text color="red" size="sm">
            {errors.email.message}
          </Text>
        )}
      </Label>

      <Label>
        <Flex justifyContent="space-between" alignItems="center">
          <Text pb="6px" size="sm">
            Senha
          </Text>
        </Flex>
        <TextInput
          isRequired
          placeholder="Digite sua senha"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
        />

        {errors.password && (
          <Text color="red" size="sm">
            {errors.password.message}
          </Text>
        )}
      </Label>

      <Label>
        <Flex justifyContent="space-between" alignItems="center">
          <Text pb="6px" size="sm">
            Confirmar senha
          </Text>
        </Flex>
        <TextInput
          isRequired
          placeholder="Digite a senha novamente"
          type={showPassword ? 'text' : 'password'}
          {...register('confirmPassword')}
        />

        {errors.confirmPassword && (
          <Text color="red" size="sm">
            {errors.confirmPassword.message}
          </Text>
        )}

        <Checkbox
          colorScheme="brand"
          size="sm"
          onChange={e => setShowPassword(e.target.checked)}
        >
          Mostra senha
        </Checkbox>
      </Label>

      <Button
        colorScheme="brand"
        gap="1"
        display="flex"
        alignItems="center"
        type="submit"
        fontSize="sm"
        disabled={isSubmitting}
        isLoading={isSigningUp}
        loadingText="Cadastrando..."
        mt="4"
      >
        <Text>Cadastrar</Text>
        <MdArrowForward />
      </Button>
    </Flex>
  );
};
