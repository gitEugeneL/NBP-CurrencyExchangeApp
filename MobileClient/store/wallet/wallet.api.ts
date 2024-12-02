import { PREFIX } from '../../helpers/api';

export const walletApi = {
  getMainUserWallet: `${PREFIX}/wallets/main`,
  getUserWallets: `${PREFIX}/wallets`,
  createUserWallet: `${PREFIX}/wallets`,
  walletOperations: `${PREFIX}/wallets/money`,
};
