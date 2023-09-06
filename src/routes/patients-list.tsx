import { Flex } from '@chakra-ui/react';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters, PatientFilters } from '../components/patient-filters';
import { PatientsTable } from '../components/patient-table';
import { PatientIndication } from '../queries/patients';

interface Props {
}

export const PatientsList: React.FC<PropsWithChildren<Props>> = () => {
  const [search] = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    patientName: search.get('patientName') ?? '',
    indication: search.get('indication') as PatientIndication ?? '',
    age: [
      parseInt(search.get('ageFrom')! ?? 0),
      parseInt(search.get('ageTo')! ?? 100)
    ]
  });

  useEffect(() => {
    setFilters({
      patientName: search.get('patientName') ?? '',
      indication: search.get('indication') as PatientIndication ?? '',
      age: [
        parseInt(search.get('ageFrom')! ?? 0),
        parseInt(search.get('ageTo')! ?? 100)
      ]
    });
  }, [search]);

  return (
    <>
      <Flex width="100%" flex={1} shadow="lg" borderRadius="md" marginY="8">
        <PatientFilters filters={filters} onFilter={setFilters} />
      </Flex>
      <PatientsTable filters={filters} />
    </>
  );
};
