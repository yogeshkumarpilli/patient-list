import { Image, Text, VStack, keyframes } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

interface Props {
}

const animationKeyFrames = keyframes`
  from { transform: scale(0.9) translate3d(0, -0.5rem, 0); opacity: 0; }
  to { transform: none; opacity: 1; }
`

export const EmptyList: React.FC<PropsWithChildren<Props>> = () => {
  return (
    <VStack align="center" w="100%" justify="center" paddingY="12">
      <Image
        animation={`${animationKeyFrames} 0.4s ease-in-out forwards`}
        src="/public/empty-box.svg" maxW="300"
      />
      <Text fontSize="3xl" fontWeight="semibold">No result</Text>
      <Text fontSize="md">Try to clear filters</Text>
    </VStack>
  );
};
