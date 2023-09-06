import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, FormLabel, HStack, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Select, Text, useDisclosure } from '@chakra-ui/react';
import React, { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { PatientIndication } from '../queries/patients';
import { useField } from '../utils';

export interface Filters {
  patientName?: string;
  indication?: string;
  age?: number[]
}

interface Props {
  onFilter(filters: Filters): void;
}

const MIN_AGE = 0;
const MAX_AGE = 100;

export const PatientFilters: React.FC<PropsWithChildren<Props>> = ({ onFilter }) => {
  const patientName = useField('');
  const indication = useField<PatientIndication | ''>('');
  const ageRange = useField<number[]>([MIN_AGE, MAX_AGE]);
  const {
    isOpen: updatingAgeRange,
    onOpen: startUpdatingAgeRange,
    onClose: endUpdatingAgeRange
  } = useDisclosure();

  const onClear = useCallback(() => {
    patientName.reset();
    indication.reset();
    ageRange.reset();
  }, []);

  const showClearButton = useMemo(() => {
    return !!patientName.value || !!indication.value || ageRange.value?.join('') !== `${MIN_AGE}${MAX_AGE}`;
  }, [patientName, indication, ageRange]);

  useEffect(() => {
    if (updatingAgeRange) { return; }
    onFilter({
      patientName: patientName.value ?? '',
      indication: indication.value ?? '',
      age: ageRange.value,
    });
  }, [patientName.value, indication.value, ageRange.value, onFilter, updatingAgeRange]);

  return (
    <HStack spacing="12" flex={1} padding="4" align="end">
      <FormControl minWidth="70">
        <FormLabel>Patient Name</FormLabel>
        <Input type="text" value={patientName.value} onChange={patientName.onChange} />
      </FormControl>
      <FormControl minW="60">
        <FormLabel>Indication</FormLabel>
        <Select value={indication.value} onChange={indication.onChange}>
          <option value="">--</option>
          <option value="post_pvc_ablation">Post PVC Ablation</option>
          <option value="post_pac_ablation">Post PAC Ablation</option>
          <option value="post_tavi">Post TAVI</option>
        </Select>
      </FormControl>
      <FormControl minW="80">
        <FormLabel>Age <Text fontSize="xs">({ageRange.value?.join(' - ')})</Text></FormLabel>
        <RangeSlider value={ageRange.value} min={MIN_AGE} max={MAX_AGE} onChange={ageRange.setValue} onChangeStart={startUpdatingAgeRange} onChangeEnd={endUpdatingAgeRange}>
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} borderColor="messenger.700" />
          <RangeSliderThumb index={1} borderColor="messenger.700" />
        </RangeSlider>
      </FormControl>
      <Box opacity={showClearButton ? 1 : 0} transition="opacity 0.2s ease-in-out">
        <Button variant="outline" size="sm" onClick={onClear} rightIcon={<CloseIcon width={2} />}>Clear</Button>
      </Box>
    </HStack>
  )
};
