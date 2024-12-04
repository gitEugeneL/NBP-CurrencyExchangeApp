import { PREFIX } from '../../helpers/api';

export const walletApi = {
  getUserWallets: `${PREFIX}/wallets`,
  getBaseUserWallet: `${PREFIX}/wallets/base`,
  createUserWallet: `${PREFIX}/wallets`,
  walletOperations: `${PREFIX}/wallets/money`,
};
