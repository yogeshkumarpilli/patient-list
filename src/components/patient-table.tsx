import { Highlight, Table, Tbody, Td, Thead, Tr, Menu, MenuButton, MenuList, IconButton, Th } from '@chakra-ui/react';
import React, { PropsWithChildren, useCallback, useState } from 'react';
import { PatientSorting, SortingDirection, usePatients } from '../queries/patients';
import { dateStringToAge, dateStringToHuman } from '../utils';
import { EmptyList } from './empty-list';
import { IndicationBadge } from './indication-badge';
import { Filters } from './patient-filters';
import { ThSorted } from './th-sorted';
import { SettingsIcon } from '@chakra-ui/icons'
import { EditModal } from './edit-modal';
import { DeleteModal } from './delete-modal';

interface Props {
  filters?: Filters;
}

export const PatientsTable: React.FC<PropsWithChildren<Props>> = ({ filters }) => {
  const [sorting, setSorting] = useState<PatientSorting>('creation_date')
  const [sortingDirection, setSortingDirection] = useState<'asc' | 'desc'>('desc');
  const patients = usePatients(filters!, sorting, sortingDirection);

  const onActive = useCallback((key: PatientSorting, direction: SortingDirection) => {
    setSorting(key);
    setSortingDirection(direction);
  }, []);

  const onReset = useCallback(() => {
    setSorting('creation_date');
    setSortingDirection('desc');
  }, [])

  if (patients.data?.length === 0) {
    return <EmptyList />
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <ThSorted 
            by='name'
            currentDirection={sortingDirection}
            currentSorting={sorting}
            onActive={onActive}
            onReset={onReset}
          >Patient Name</ThSorted>
          <ThSorted 
            by='indication'
            currentDirection={sortingDirection}
            currentSorting={sorting}
            onActive={onActive}
            onReset={onReset}
          >Indication</ThSorted>
          <ThSorted 
            by='birth_date'
            currentDirection={sortingDirection}
            currentSorting={sorting}
            onActive={onActive}
            onReset={onReset}
          >Age</ThSorted>
          <ThSorted 
            by='creation_date'
            currentDirection={sortingDirection}
            currentSorting={sorting}
            onActive={onActive}
            onReset={onReset}
          >Creation date</ThSorted>
          <Th>
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {patients.data?.map(patient => (
          <Tr key={patient.id}>
            <Td>
              <Highlight query={filters?.patientName ?? ''} styles={{ py: '1', bg: 'orange.100' }}>
                {`${patient.first_name} ${patient.last_name}`}
              </Highlight>
            </Td>
            <Td><IndicationBadge>{patient.indication}</IndicationBadge></Td>
            <Td>{dateStringToAge(patient.birth_date)}</Td>
            <Td>{dateStringToHuman(patient.creation_date)}</Td>
            <Td>
            <Menu>
              <MenuButton colorScheme='teal' size='xs' isRound={true} as={IconButton} icon={<SettingsIcon />}/>
              <MenuList>
                <EditModal patient={patient} />
                <DeleteModal patient={patient} ></DeleteModal>
              </MenuList>
            </Menu>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
};
