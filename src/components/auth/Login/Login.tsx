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
  BackgroundImage,
} from '@mantine/core';

import Image from '../../../assets/background.svg';

const redirectToLoginWithGoogle = async () => {
  window.location.href = `http://${import.meta.env.VITE_BASE_API}/auth/google`;
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <BackgroundImage src={Image} radius="100px">
      <Title ta="center" order={2} pt={40} pb={20}>
        BANANA BANK
      </Title>
      <Paper w="500px" radius="100px" p={60} pt={30}>
        <form onSubmit={handleSubmit}>
          <Stack mt="xl">
            <TextInput
              radius={20}
              label="Email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordInput
              radius={20}
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" fullWidth mt="xl">
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
    </BackgroundImage>
  );
}
