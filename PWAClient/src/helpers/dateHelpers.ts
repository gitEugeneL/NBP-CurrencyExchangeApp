export const dateToFormat = (value: Date | null): string | null => {
  if (!value) {
    return null;
  }
  const day = String(value.getDate()).padStart(2, '0');
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const year = value.getFullYear();
  return `${month}-${day}-${year}`;
};

export const isToday = (date: Date | null): boolean => {
  if (!date) {
    return false;
  }
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const dateToString = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return formatter.format(date).replace(',', '');
};
