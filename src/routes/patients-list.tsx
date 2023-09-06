import { Flex } from '@chakra-ui/react';
import React, { PropsWithChildren, useState } from 'react';
import { Filters, PatientFilters } from '../components/patient-filters';
import { PatientsTable } from '../components/patient-table';

interface Props {
}

export const PatientsList: React.FC<PropsWithChildren<Props>> = () => {
  const [filters, setFilters] = useState<Filters>();

  return (
    <>
      <Flex width="100%" flex={1} shadow="lg" borderRadius="md" marginY="8">
        <PatientFilters onFilter={setFilters} />
      </Flex>
      <PatientsTable filters={filters} />
    </>
  );
};
