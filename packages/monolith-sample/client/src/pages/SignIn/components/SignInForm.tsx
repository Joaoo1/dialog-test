import { Button, Checkbox, Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdArrowForward } from 'react-icons/md';
import { z } from 'zod';
import { Label } from '../../../components/Label';
import { TextInput } from '../../../components/TextInput';
import { useAuth } from '../../../hooks/context/useAuth';

const signInFormSchema = z.object({
  email: z
    .string()
    .email('Deve ser um e-mail válido')
    .min(1, { message: 'Este campo é obrigatório' }),
  password: z.string().min(1, { message: 'Este campo é obrigatório' }),
});

type ISignInFormData = z.infer<typeof signInFormSchema>;

export const SignInForm: React.FC = () => {
  const { signIn, isAuthenticating } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignInFormData>({
    resolver: zodResolver(signInFormSchema, { async: false }),
  });

  return (
    <Flex
      as="form"
      mt={6}
      flexDirection="column"
      gap={5}
      onSubmit={handleSubmit(signIn)}
    >
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
        isLoading={isAuthenticating}
        loadingText="Entrando..."
        mt="4"
      >
        <Text>Entrar</Text>
        <MdArrowForward />
      </Button>
    </Flex>
  );
};
