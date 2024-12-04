import React, { useCallback } from 'react';
import CurrencyCard from '../../components/CurrencyCard/CurrencyCard';
import { useAtomValue, useSetAtom } from 'jotai';
import { currencyState, getAllCurrenciesAtom } from '../../store/currency/currency.state';
import { walletState } from '../../store/wallet/wallet.state';
import { useFocusEffect } from 'expo-router';
import { CurrencyParams } from '../../store/currency/currency.models';
import BaseWalletCard from '../../components/BaseWalletCard/BaseWalletCard';
import Loading from '../../UI/Loading/Loading';

export default function BuyCurrency() {
  const { wallets } = useAtomValue(walletState);
  const { isLoading, currencies } = useAtomValue(currencyState);
  const loadCurrencies = useSetAtom(getAllCurrenciesAtom);

  useFocusEffect(
    useCallback(() => {
      const params: CurrencyParams = {
        withRate: true,
        currencyDate: null,
      };
      loadCurrencies(params);
    }, []),
  );

  const baseWallet = wallets.find((wallet) => wallet.currencyShortName === 'PLN');

  return (
    <>
      {baseWallet && (
        <BaseWalletCard
          name={baseWallet.currencyName}
          shortName={baseWallet.currencyShortName}
          symbol={baseWallet.currencySymbol}
          value={baseWallet.value}
        />
      )}

      {isLoading && <Loading />}

      {!isLoading &&
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
    </>
  );
}
