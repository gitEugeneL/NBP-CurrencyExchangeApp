import { PREFIX } from '../../helpers/api';

export const walletApi = {
  getUserWallets: `${PREFIX}/wallets`,
  createUserWallet: `${PREFIX}/wallets`,
  addMoney: `${PREFIX}/wallets/add-money`,
};
