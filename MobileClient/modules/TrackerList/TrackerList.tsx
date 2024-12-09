import { useAtomValue, useSetAtom } from 'jotai/index';
import { currencyState, getAllCurrenciesAtom } from '../../store/currency/currency.state';
import React, { useCallback, useState } from 'react';
import { CurrencyParams } from '../../store/currency/currency.models';
import Loading from '../../UI/Loading/Loading';
import CurrencyCard from '../../components/CurrencyCard/CurrencyCard';
import DatePicker from './components/DatePicker/DatePicker';
import { View } from 'react-native';
import { dateToFormat, isToday } from '../../helpers/dateHelpers';
import { useFocusEffect } from 'expo-router';
import WarningCard from '../../components/WarningCard/WarningCard';

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
      currencyDate: isToday(value) ? null : dateToFormat(value),
    };
    loadCurrencies(params);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <>
      <DatePicker loadWithDate={loadData} date={date} setDate={setDate} />

      {isLoading && <Loading />}

      {!isLoading && currencies.length === 0 && (
        <WarningCard
          appearance="speed"
          title="There is no data available on this day. It is probably a weekend or a holiday!"
          buttonName="Check the current rate"
          action={loadData}
        />
      )}

      <View>
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
      </View>
    </>
  );
}
