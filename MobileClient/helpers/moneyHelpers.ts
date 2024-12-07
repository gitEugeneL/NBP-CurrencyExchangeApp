export const roundMoney = (amount: number, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(amount * factor) / factor;
};
