import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Text, Th } from '@chakra-ui/react';
import React, { PropsWithChildren, useCallback } from 'react';
import { PatientSorting, SortingDirection } from '../queries/patients';

interface Props {
  by: PatientSorting;
  currentSorting: PatientSorting;
  currentDirection: SortingDirection;
  onActive(sorting: PatientSorting, direction: SortingDirection): void;
}

export const ThSorted: React.FC<PropsWithChildren<Props>> = ({ by, currentSorting, currentDirection, onActive, children }) => {
  const onSort = useCallback(() => {
    onActive(by, currentDirection == 'asc' ? 'desc' : 'asc');
  }, [onActive, by, currentDirection]);

  const icon = currentDirection === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />;
  const displayIcon = by === currentSorting;

  return (
    <Th cursor="pointer" onClick={onSort} _hover={{ background: 'gray.200' }}>
      <Text>
        {children}
        <Box as="span" visibility={displayIcon ? 'visible' : 'hidden'}>{icon}</Box>
      </Text>
    </Th>
  )
};
