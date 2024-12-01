import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';
import { DatePickerProps } from './DatePicker.props';
import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Button from '../../../../UI/Button/Button';
import { dateToFormat } from '../../../../helpers/dateHelpers';

export default function DatePicker({ date, setDate, loadWithDate }: DatePickerProps) {
  const [show, setShow] = useState<boolean>(false);

  const showDatePicker = () => {
    setShow(true);
  };

  const handleDatePicker = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      loadWithDate(currentDate);
      setDate(currentDate);
      setShow(false);
    } else if (event.type === 'dismissed') {
      setShow(false);
    }
  };

  return (
    <>
      <View style={style.card}>
        <View style={style.dateBlock}>
          <Text style={style.dateText}>{dateToFormat(date)}</Text>
        </View>
        <View style={style.buttonBlock}>
          <Button name="Change" size="small" onPress={showDatePicker} />
        </View>
      </View>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDatePicker}
          maximumDate={new Date()}
        />
      )}
    </>
  );
}

const style = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    padding: 15,
    borderRadius: Radius.radius20,
    backgroundColor: Colors.violetDark,
    gap: Gaps.gap40,
  },

  dateBlock: {
    marginLeft: 30,
  },

  buttonBlock: {
    flex: 1,
  },

  dateText: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSize.size16,
    color: Colors.white,
  },
});
