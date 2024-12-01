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
