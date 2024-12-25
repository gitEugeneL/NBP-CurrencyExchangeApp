import { MoveCurrencyProps } from './MoveCurrency.props.ts';
import {
  currencyState,
  getAllCurrenciesAtom
} from '../../store/currency/currency.state.ts';
import {
  getUserWalletsAtom,
  walletState
} from '../../store/wallet/wallet.state.ts';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { CurrencyParams } from '../../store/currency/currency.models.ts';
import BaseWalletCard from './components/BaseWalletCard/BaseWalletCard.tsx';
import LoaderIndicator from '../../assets/elements/LoaderIndicator.tsx';
import CurrencyCard from '../../components/CurrencyCard/CurrencyCard.tsx';

export default function MoveCurrency({ appearance }: MoveCurrencyProps) {
  const { wallets } = useAtomValue(walletState);
  const { isLoading, currencies } = useAtomValue(currencyState);
  const loadCurrencies = useSetAtom(getAllCurrenciesAtom);
  const loadWallets = useSetAtom(getUserWalletsAtom);

  useEffect(() => {
    const params: CurrencyParams = {
      withRate: true,
      currencyDate: null
    };
    loadCurrencies(params);
  }, []);

  useEffect(() => {
    if (wallets.length === 0) {
      loadWallets();
    }
  }, []);

  const baseWallet = wallets.find(
    (wallet) => wallet.currencyShortName === 'PLN'
  );

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
      {isLoading && <LoaderIndicator />}

      {!isLoading &&
        wallets.map((wallet) =>
          currencies.map(
            (currency) =>
              currency.currencyId === wallet.currencyId && (
                <CurrencyCard
                  appearance={appearance}
                  symbol={wallet.currencySymbol}
                  baseValue={baseWallet!.value}
                  walletValue={wallet.value}
                  walletId={wallet.walletId}
                  shortName={wallet.currencyShortName}
                  nbpRate={currency.nbpRate}
                  sellRate={currency.sellRate}
                  buyRate={currency.buyRate}
                  date={new Date()}
                  name={wallet.currencyName}
                  key={wallet.walletId}
                />
              )
          )
        )}
    </>
  );
}
