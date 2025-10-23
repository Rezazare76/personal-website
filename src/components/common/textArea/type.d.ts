export default interface TextAreaProps {
  mainContainerClass?: string;
  containerClass?: string;
  className?: string;
  name?: string;
  id?: string;
  cols?: number;
  rows?: number;
  minHeight?: number;
  maxHeight?: number;
  onChange?: (arg: string) => void;
  onInput?: (arg: string) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string | undefined;
  error?: boolean;
}
