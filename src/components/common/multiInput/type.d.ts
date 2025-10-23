export interface MultiInputProps {
  onAllInputsFilled: (values: string) => void;
  containerClassName?: string;
  maxLength: number;
  error?: boolean;
  errorMessage?: string;
  errorClass?: string;
  inputsClass?: string;
}
