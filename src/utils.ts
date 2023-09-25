import { ChangeEvent, useCallback, useState, useEffect } from "react";
import { PatientIndication } from "./queries/patients";

export const dateStringToAge = (date: string): number => {
  const age = new Date(date).getFullYear()
  const now = new Date().getFullYear()

  return now - age;
}

export const dateStringToHuman = (date: string) => new Date(date).toLocaleDateString();

export const indicationToString = (indication: PatientIndication): string => {
  switch (indication) {
    case 'palpitations':
      return 'Palpitations';
    case 'post_pvc_ablation':
      return 'Post PVC Ablation';
    case "post_tavi":
      return 'Post TAVI';
  }
}

export const patientKeyToString = (key: string): string => {
  return key.split('_').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' ');
}

export function useField<T = string>(defaultValue?: T) {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(evt.target.value as T);
  }, []);
  return {
    onChange,
    setValue,
    value,
    reset() {
      setValue(defaultValue);
    }
  }
}
