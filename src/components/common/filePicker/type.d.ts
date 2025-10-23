export default interface FilePickerProps {
  description?: string;
  type: string;
  setFile: (e: ChangeEvent<HTMLInputElement>, clear?: () => void) => void;
  value?: string;
  name?: string;
  setDelete?: () => void;
  loading?: boolean;
  error?: boolean;
}
