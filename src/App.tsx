import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';
import { Link, Outlet } from 'react-router-dom';

interface Props {
}

export const App: React.FC<PropsWithChildren<Props>> = () => {
  return (
    <Box>
      <Box width="100vw" padding="4" shadow="base">
        <HStack maxWidth="6xl" marginX="auto">
          <Button as={Link} to="/" variant="ghost">
            <Image src="/logo.svg" width="40" marginY="-16" />
          </Button>
          <Text fontSize="md">Patient organizer App</Text>
          <Box flex={1} textAlign="right">
            <Button as={Link} variant="outline" to="/patient/invite">Invite a new Patient</Button>
          </Box>
        </HStack>
      </Box>
      <VStack maxWidth="6xl" marginX="auto">
        <Box paddingX="4" width="100%">
          <Outlet />
        </Box>
      </VStack>
    </Box>
  );
};
