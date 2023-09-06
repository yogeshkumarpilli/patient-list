import { useMutation, useQuery, useQueryClient } from "react-query";
import { Filters } from "../components/patient-filters";
import { dateStringToAge, patientKeyToString } from "../utils";
import { useToast } from "@chakra-ui/react";

export type PatientIndication =
| 'post_pvc_ablation'
| 'post_pac_ablation'
| 'post_tavi'

export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  indication: PatientIndication;
  creation_date: string;
}

export type PatientSorting = 'name' | 'birth_date' | 'indication' | 'creation_date';
export type SortingDirection = 'asc' | 'desc';

export const usePatients = (
  filters?: Filters,
  sorting: PatientSorting = 'creation_date',
  sortingDirection: SortingDirection = 'asc',
) => {
  return useQuery('patients', async function() {
    const resp = await fetch('/api/patients');
    const data = await resp.json();

    return data as Patient[]
  }, {
    select(data) {
      if (filters == null) { return data; }

      return data?.sort((pA, pB) => {
        const mainPatient = sortingDirection === 'asc' ? pB : pA;
        const secondPatient = sortingDirection === 'asc' ? pA : pB;

        switch (sorting) {
          case 'name':
            return secondPatient.first_name.localeCompare(mainPatient.first_name);
          case 'birth_date':
            return new Date(mainPatient.birth_date).getTime() - new Date(secondPatient.birth_date).getTime();
          case 'indication':
            return mainPatient.indication > secondPatient.indication ? -1 : 1
          default:
            return new Date(secondPatient.creation_date).getTime() - new Date(mainPatient.creation_date).getTime();
        }
      }).filter((patient) => {
        let matches = true;
        if (filters?.patientName && filters?.patientName.length >= 2) {
          const reg = new RegExp(filters.patientName, 'i');
          matches &&=
            reg.test(patient.first_name) ||
            reg.test(patient.last_name)
        }
        if (filters?.indication) {
          matches &&= patient.indication === filters.indication;
        }
        if (filters?.age) {
          const [min, max = Infinity] = filters.age;
          const patientAge = dateStringToAge(patient.birth_date);
  
          matches &&= patientAge >= min && patientAge <= max;
        }
        return matches;
      });
    }
  });
}

export const useInvitePatient = () => {
  const queryClient = useQueryClient();
  const successToast = useToast({
    title: 'Patient created successfully',
    colorScheme: 'green',
    duration: 3000,
    isClosable: true,
    position: 'top',
  })

  const errorToast = useToast({
    duration: 3000,
    colorScheme: 'red',
    position: 'top',
    isClosable: true,
  })

  return useMutation<Patient, { reason: string, parameters: string[] }, Omit<Patient, 'id' | 'creation_date'>>({
    async mutationFn(patient) {
      const resp = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient)
      })

      if (resp.status === 400) {
        throw await resp.json()
      }

      return await resp.json();
    },
    onError(error) {
      errorToast({
        title: error.reason,
        description: `${error.parameters.map(key => patientKeyToString(key))}`,
      })
    },
    onSuccess() {
      queryClient.invalidateQueries('patients');
      successToast();
    },
  })
}
