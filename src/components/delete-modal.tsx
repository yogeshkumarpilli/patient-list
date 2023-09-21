import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    MenuItem,
    VStack,
    Button,
    useDisclosure,
  } from '@chakra-ui/react';
import { useState, FC, useCallback, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient, useDeletePatient } from '../queries/patients';

interface Props {
  patient: Patient,
} 
export const DeleteModal: FC<Props> = ({ patient }) => {
  const deletePatient = useDeletePatient(patient.id);

  const navigate = useNavigate();

  const onSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault();
    onClose();
    deletePatient.mutate({
      first_name: '',
      last_name: '',
      birth_date: '',
      indication: 'post_pvc_ablation',
    }, {
      onSuccess() {
        navigate('/');
      }
    })
  }, [deletePatient, navigate]);
  
  const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
    return (
      <VStack
      >
        <MenuItem
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen()
          }}
        >
          Delete
        </MenuItem>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>Delete patient {patient.first_name} {patient.last_name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to delete this patient? This actions is irreversible.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>Cancel</Button>
              <Button type="submit" variant='ghost'onClick={onSubmit}>Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    )
  }