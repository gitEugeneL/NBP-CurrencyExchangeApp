import { useAtomValue, useSetAtom } from 'jotai';
import {
  currencyState,
  getAllCurrenciesAtom
} from '../../store/currency/currency.state.ts';
import { useEffect, useState } from 'react';
import { CurrencyParams } from '../../store/currency/currency.models.ts';
import { dateToFormat, isToday } from '../../helpers/dateHelpers.ts';
import LoaderIndicator from '../../assets/elements/LoaderIndicator.tsx';
import CurrencyCard from '../../components/CurrencyCard/CurrencyCard.tsx';
import DatePicker from './components/DatePicker/DatePicker.tsx';
import WarningCard from '../../components/WarningCard/WarningCard.tsx';

export default function TrackerList() {
  const { isLoading, currencies } = useAtomValue(currencyState);
  const loadCurrencies = useSetAtom(getAllCurrenciesAtom);
  const [date, setDate] = useState<Date>(new Date());

  const loadData = (value: Date | null = null) => {
    if (!value) {
      setDate(new Date());
    } else {
      setDate(value);
    }
    const params: CurrencyParams = {
      withRate: true,
      currencyDate: isToday(value) ? null : dateToFormat(value)
    };
    loadCurrencies(params);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <DatePicker loadWithDate={loadData} date={date} setDate={setDate} />

      {isLoading && <LoaderIndicator width={100} height={100} />}

      {!isLoading && currencies.length === 0 && (
        <WarningCard
          appearance='speed'
          title='There is no data available on this day. It is probably a weekend or a holiday!'
          buttonName='Check the current rate'
          action={loadData}
        />
      )}

      {!isLoading &&
        currencies.map((currency) => (
          <CurrencyCard
            symbol={currency.symbol}
            key={currency.currencyId}
            shortName={currency.shortName}
            name={currency.name}
            buyRate={currency.buyRate}
            sellRate={currency.sellRate}
            nbpRate={currency.nbpRate}
            date={date}
          />
        ))}
    </>
  );
}
