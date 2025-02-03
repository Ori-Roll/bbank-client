import { FormEvent, useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Button,
  Divider,
  Group,
  Stack,
  Flex,
  Center,
  FlexProps,
} from '@mantine/core';

import YourSvg from '../../../assets/pigibank_all.svg';
import { useIsMobile } from '../../../hooks/configHooks';

const redirectToLoginWithGoogle = async () => {
  window.location.href = `http://${import.meta.env.VITE_BASE_API}/auth/google`;
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isMobile = useIsMobile();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add login logic here
  };

  const layoutStyle = {
    direction: isMobile ? 'column' : 'row',
    align: 'center',
    w: isMobile ? '100%' : '1000px',
    p: isMobile ? '30px' : '40px',
  } satisfies FlexProps;

  const paperStyle = {
    width: !isMobile ? '100%' : '200px',
  } as const;

  return (
    <Center w="100%">
      <Flex {...layoutStyle}>
        <Paper w="100%">
          <Title ta="center" order={2} pt={40} pb={20}>
            BANANA BANK
          </Title>
          <form onSubmit={handleSubmit}>
            <Stack mt="xl">
              <TextInput
                label="Email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button variant="outline" type="submit" fullWidth mt="xl">
                Sign in
              </Button>
            </Stack>
          </form>

          <Divider label="Or continue with" labelPosition="center" my="lg" />

          <Group grow mb="md" mt="md">
            <Button variant="default" onClick={redirectToLoginWithGoogle}>
              Google
            </Button>
            <Button variant="default">Facebook</Button>
          </Group>
        </Paper>
        <img style={{ height: '620px' }} src={YourSvg} />
      </Flex>
    </Center>
  );
}
