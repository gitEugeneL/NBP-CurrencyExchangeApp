export interface WarningCardProps {
  appearance: 'speed' | 'money';
  title: string;
  buttonName: string;
  redirectRoute?: string;
  action?: () => void;
}
