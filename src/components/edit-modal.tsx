import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select
} from '@chakra-ui/react';
import { FC, FormEvent, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient, PatientIndication, useUpdatePatient } from '../queries/patients';
import { useField } from '../utils';

interface Props {
  patient: Patient,
  onClose(): void;
} 
export const EditModal: FC<Props> = ({ patient, onClose }) => {
  const defaultBirthDate = useMemo(() => {
    return patient.birth_date.split('T')[0];
  }, [patient.birth_date])

  const updatePatient = useUpdatePatient(patient.id);
  const firstName = useField(patient.first_name);
  const lastName = useField(patient.last_name);
  const birthDate = useField(defaultBirthDate);
  const indication = useField<PatientIndication>(patient.indication);
  const navigate = useNavigate();

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();
    
    updatePatient.mutate({
      first_name: firstName.value!,
      last_name: lastName.value!,
      birth_date: birthDate.value!,
      indication: indication.value!,
    }, {
      onSuccess() {
        onClose();
        navigate('/');
      }
    })
  }, [updatePatient, firstName.value, lastName.value, birthDate.value, indication.value, onClose, navigate]);

  return (
    <Modal isCentered isOpen={true} onClose={onClose}>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent as="form" onSubmit={onSubmit}>
        <ModalHeader>Edit patient information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input placeholder='First name' value={firstName.value} onChange={firstName.onChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last name</FormLabel>
            <Input placeholder='Last name' value={lastName.value} onChange={lastName.onChange}/>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Birth date</FormLabel>
            <Input value={birthDate.value} onChange={birthDate.onChange} type="date" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Indication</FormLabel>
            <Select value={indication.value} onChange={indication.onChange}>
                <option value="post_pvc_ablation">Post PVC Ablation</option>
                <option value="palpitations">Palpitations</option>
                <option value="post_tavi">Post TAVI</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
          <Button type="submit" variant='ghost' onClick={onSubmit}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
