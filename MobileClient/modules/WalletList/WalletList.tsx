import React, { useEffect } from 'react';
import { currencyState, getAllCurrenciesAtom } from '../../store/currency/currency.state';
import { getUserWalletsAtom, walletState } from '../../store/wallet/wallet.state';
import { useAtomValue, useSetAtom } from 'jotai';
import { WalletResponse } from '../../store/wallet/wallet.models';
import Loading from '../../UI/Loading/Loading';
import { CurrencyParams } from '../../store/currency/currency.models';
import WalletCard from './components/WalletCard/WalletCard';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Colors } from '../../UI/styles';

export default function WalletList() {
  const { isLoading: currenciesLoading, currencies } = useAtomValue(currencyState);
  const { isLoading: walletLoading, wallets } = useAtomValue(walletState);
  const loadCurrencies = useSetAtom(getAllCurrenciesAtom);
  const loadWallets = useSetAtom(getUserWalletsAtom);

  useEffect(() => {
    const params: CurrencyParams = {
      withRate: false,
      currencyDate: null,
    };
    loadCurrencies(params);
    loadWallets();
  }, []);

  const walletMap: Record<string, WalletResponse | undefined> = {};
  wallets.forEach((wallet) => {
    walletMap[wallet.currencyShortName] = wallet;
  });

  const sortedCurrencies = currencies.sort((a, b) => {
    if (a.shortName === 'PLN') return -1;
    if (b.shortName === 'PLN') return 1;
    const hasWalletA = walletMap[a.shortName] !== undefined;
    const hasWalletB = walletMap[b.shortName] !== undefined;
    if (hasWalletA === hasWalletB) return 0;
    return hasWalletA ? -1 : 1;
  });

  const baseWallet = !walletLoading
    ? wallets.find((wallet) => wallet.currencyShortName === 'PLN')
    : null;

  if (currenciesLoading || walletLoading) {
    return <Loading />;
  }

  return (
    <>
      {baseWallet && (
        <View style={{ backgroundColor: Colors.blackBlue }}>
          <WalletCard
            isCreated={true}
            name={baseWallet.currencyName}
            shortName={baseWallet.currencyShortName}
            country={baseWallet.currencyCountry}
            symbol={baseWallet.currencySymbol}
            value={baseWallet.value}
            currencyId={baseWallet.currencyId}
            walletId={baseWallet.walletId}
          />
        </View>
      )}
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
            value={walletMap[currency.shortName]?.value || 0}
          />
        ))}
      </ScrollView>
    </>
  );
}
