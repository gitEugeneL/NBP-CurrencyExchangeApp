import { ScrollView } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { currencyState, getAllCurrenciesAtom } from '../../store/currency/currency.state';
import { getUserWalletsAtom, walletState } from '../../store/wallet/wallet.state';
import { useAtomValue, useSetAtom } from 'jotai';
import WalletCard from './components/WalletCard/WalletCard';
import { WalletResponse } from '../../store/wallet/wallet.models';
import Loading from '../../UI/Loading/Loading';

export default function WalletList() {
  const { isLoading: currenciesLoading, currencies } = useAtomValue(currencyState);
  const { isLoading: walletLoading, wallets } = useAtomValue(walletState);
  const loadCurrencies = useSetAtom(getAllCurrenciesAtom);
  const loadWallets = useSetAtom(getUserWalletsAtom);

  useEffect(() => {
    if (currencies.length === 0) {
      loadCurrencies();
    }
  }, []);

  useEffect(() => {
    if (wallets.length === 0) {
      loadWallets();
    }
  }, []);

  const walletMap: Record<string, WalletResponse | undefined> = {};
  wallets.forEach((wallet) => {
    walletMap[wallet.currencyShortName] = wallet;
  });

  const sortedCurrencies = currencies.sort((a, b) => {
    const hasWalletA = walletMap[a.shortName] !== undefined;
    const hasWalletB = walletMap[b.shortName] !== undefined;

    if (hasWalletA === hasWalletB) return 0;
    return hasWalletA ? -1 : 1;
  });

  if (currenciesLoading || walletLoading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      {sortedCurrencies.map((currency) => (
        <WalletCard
          key={currency.currencyId}
          isCreated={walletMap[currency.shortName] !== undefined}
          name={currency.name}
          shortName={currency.shortName}
          country={currency.country}
          symbol={currency.symbol}
          currencyId={currency.currencyId}
          walletId={walletMap[currency.shortName]?.walletId || ''}
          value={walletMap[currency.shortName]?.value?.toString() || ''}
        />
      ))}
    </ScrollView>
  );
}
