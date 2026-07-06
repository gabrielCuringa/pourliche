import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const minArrayLength = (min: number) => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as unknown[];

    return value.length >= min ? null : { minArrayLength: { required: min } };
  };
};
