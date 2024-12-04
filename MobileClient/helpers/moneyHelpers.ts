export const formatMoney = (number: number) => {
  return number.toString().includes('.') ? number.toString() : `${number}.00`;
};
