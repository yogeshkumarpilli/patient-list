import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Text, Th } from '@chakra-ui/react';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { PatientSorting, SortingDirection } from '../queries/patients';

interface Props {
  by: PatientSorting;
  currentSorting: PatientSorting;
  currentDirection: SortingDirection;
  onActive(sorting: PatientSorting, direction: SortingDirection): void;
  onReset(): void;
}

export const ThSorted: React.FC<PropsWithChildren<Props>> = ({ by, currentSorting, currentDirection, onActive, onReset, children }) => {
  const [ternary, setTernary] = useState(0);

  useEffect(() => {
    if (ternary > 0 && by !== currentSorting) {
      setTernary(0);
    }
  }, [currentSorting, by, ternary]);

  const onSort = useCallback(() => {
    if (ternary === 2) {
      onReset();
    } else {
      onActive(by, currentDirection == 'asc' ? 'desc' : 'asc');
    }
    setTernary((ternary + 1) % 3);
  }, [onActive, onReset, by, currentDirection, ternary]);

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
