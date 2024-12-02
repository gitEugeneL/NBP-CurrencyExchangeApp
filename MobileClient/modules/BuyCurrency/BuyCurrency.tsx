import { View } from 'react-native';
import { useAtomValue, useSetAtom } from 'jotai/index';
import { currencyState, getAllCurrenciesAtom } from '../../store/currency/currency.state';
import { getUserWalletsAtom, walletState } from '../../store/wallet/wallet.state';
import React, { useCallback } from 'react';
import { CurrencyParams } from '../../store/currency/currency.models';
import { dateToFormat } from '../../helpers/dateHelpers';
import { useFocusEffect } from 'expo-router';
import Loading from '../../UI/Loading/Loading';
import CurrencyCard from '../../components/CurrencyCard/CurrencyCard';
import MainWallet from './components/MainWallet/MainWallet';

export default function BuyCurrency() {
  const { isLoading: currenciesLoading, currencies } = useAtomValue(currencyState);
  const { isLoading: walletLoading, wallets } = useAtomValue(walletState);
  const loadCurrencies = useSetAtom(getAllCurrenciesAtom);
  const loadWallets = useSetAtom(getUserWalletsAtom);

  useFocusEffect(
    useCallback(() => {
      const params: CurrencyParams = {
        withRate: true,
        currencyDate: dateToFormat(new Date()),
      };
      loadCurrencies(params);
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      loadWallets();
    }, []),
  );

  if (currenciesLoading || walletLoading) {
    return <Loading />;
  }

  return (
    <View>
      {!walletLoading &&
        wallets.map(
          (wallet) =>
            wallet.currencyShortName === 'PLN' && (
              <MainWallet
                key={wallet.currencyId}
                name={wallet.currencyName}
                shortName={wallet.currencyShortName}
                value={wallet.value}
              />
            ),
        )}

      {!walletLoading &&
        wallets.map((wallet) =>
          currencies.map(
            (currency) =>
              currency.currencyId === wallet.currencyId && (
                <CurrencyCard
                  appearance="buy"
                  walletId={wallet.walletId}
                  shortName={wallet.currencyShortName}
                  nbpRate={currency.nbpRate}
                  sellRate={currency.sellRate}
                  buyRate={currency.buyRate}
                  date={new Date()}
                  name={wallet.currencyName}
                  key={wallet.walletId}
                />
              ),
          ),
        )}
    </View>
  );
}
