export interface DatePickerProps {
  loadWithDate: (date: Date) => void;
  setDate: (date: Date) => void;
  date: Date;
}
