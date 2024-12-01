export interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  loadWithDate: (date: Date) => void;
}
