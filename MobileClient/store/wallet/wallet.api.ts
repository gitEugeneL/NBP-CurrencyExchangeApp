import { PREFIX } from '../../helpers/api';

export const walletApi = {
  getUserWallets: `${PREFIX}/wallets`,
  createUserWallet: `${PREFIX}/wallets`,
  walletOperations: `${PREFIX}/wallets/money`,
};
