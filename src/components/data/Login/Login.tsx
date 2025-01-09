import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  BackgroundImage,
} from '@mantine/core';

import Image from '../../../assets/background.svg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <Container my={40}>
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
            <Button variant="default">Google</Button>
            <Button variant="default">Facebook</Button>
          </Group>
        </Paper>
      </BackgroundImage>
    </Container>
  );
}
