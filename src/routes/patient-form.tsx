import { Button, Flex, FormControl, FormLabel, HStack, Input, Select, VStack } from '@chakra-ui/react';
import React, { FormEvent, PropsWithChildren, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientIndication, useInvitePatient } from '../queries/patients';
import { useField } from '../utils';

interface Props {
}

export const PatientForm: React.FC<PropsWithChildren<Props>> = () => {
  const invitePatient = useInvitePatient();
  const firstName = useField('');
  const lastName = useField('');
  const birthDate = useField('');
  const indication = useField<PatientIndication>();
  const navigate = useNavigate();

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();

    invitePatient.mutate({
      first_name: firstName.value!,
      last_name: lastName.value!,
      birth_date: birthDate.value!,
      indication: indication.value!,
    }, {
      onSuccess() {
        navigate('/');
      }
    })
  }, [invitePatient, firstName.value, lastName.value, birthDate.value, indication.value, navigate]);

  return (
    <VStack
      maxWidth="3xl"
      spacing="8"
      as="form"
      marginY="8"
      marginX="auto"
      shadow="base"
      padding="4"
      onSubmit={onSubmit}
      noValidate
    >
      <HStack spacing="12" width="100%">
        <FormControl isRequired>
          <FormLabel>First name</FormLabel>
          <Input value={firstName.value} onChange={firstName.onChange} type="text" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Last name</FormLabel>
          <Input value={lastName.value} onChange={lastName.onChange} type="text" />
        </FormControl>
      </HStack>
      <HStack spacing="12" width="100%">
        <FormControl isRequired>
          <FormLabel>Birth date</FormLabel>
          <Input value={birthDate.value} onChange={birthDate.onChange} type="date" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Indication</FormLabel>
          <Select value={indication.value} onChange={indication.onChange}>
            <option value="">--</option>
            <option value="post_pvc_ablation">Post PVC Ablation</option>
            <option value="post_pac_ablation">Post PAC Ablation</option>
            <option value="post_tavi">Post TAVI</option>
          </Select>
        </FormControl>
      </HStack>
      <Flex justify="end" width="100%">
        <Button type="submit">Invite</Button>
      </Flex>
    </VStack>
  )
};
