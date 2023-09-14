import React, { PropsWithChildren, useMemo } from 'react';
import { PatientIndication } from '../queries/patients';
import { Badge } from '@chakra-ui/react';
import { indicationToString } from '../utils';

interface Props {
  children: PatientIndication;
}

export const IndicationBadge: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const colorScheme = useMemo(() => {
    switch(children) {
      case 'palpitations':
        return 'pink';
      case 'post_pvc_ablation':
        return 'purple';
      case 'post_tavi':
        return 'orange';
    }
  }, [children]);

  return <Badge colorScheme={colorScheme}>{indicationToString(children)}</Badge>;
};
