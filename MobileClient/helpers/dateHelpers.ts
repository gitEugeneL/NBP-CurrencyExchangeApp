export const dateToFormat = (value: Date | null): string | null => {
  return value?.toISOString().split('T')[0] ?? null;
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
    minute: '2-digit',
  });

  return formatter.format(date).replace(',', '');
};
