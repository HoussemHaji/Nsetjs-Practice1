import { ValidationArguments } from 'class-validator';

export const minLengthError = (length: number) => {
  return { message: `Minimum length  is ${length}` };
};

export const maxLengthError = (length: number) => {
  return { message: `Maximum length  is ${length}` };
};

export const emptyErrorMessage = (args: ValidationArguments) => {
  return { message: `The ${args.targetName} is Empty !!!` };
};
