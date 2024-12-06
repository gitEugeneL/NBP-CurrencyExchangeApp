import { Modal, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import React from 'react';
import { CurrencyOperationModalProps } from './CurrencyOperationModal.props';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../UI/styles';
import Button from '../../../../UI/Button/Button';
import MoneyInput from '../../../MoneyInput/MoneyInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CurrencyOperationSchema,
  CurrencyOperationValidationSchema,
} from './CurrencyOperationModal.schemes';

export default function CurrencyOperationModal({
  rate,
  maxValue,
  symbol,
  isVisible,
  operationType,
  onClose,
  name,
  shortName,
  operation,
}: CurrencyOperationModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyOperationSchema>({
    resolver: yupResolver(CurrencyOperationValidationSchema(maxValue)),
  });

  const formSubmit = (data: CurrencyOperationSchema) => {
    operation(data.amount);
  };

  return (
    <Modal transparent={true} animationType="fade" visible={isVisible} onRequestClose={onClose}>
      <BlurView intensity={10} style={styles.blurContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {operationType === 'buy' ? 'Buy ' : 'Sell '}
            {name}
          </Text>

          <View>
            <MoneyInput
              label={`1${symbol} = ${rate}zł (Max: ${maxValue.toFixed(4)}${symbol})`}
              name="amount"
              keyboardType="numeric"
              shortName={shortName}
              control={control}
              placeholder={maxValue.toFixed(4)}
              errors={errors}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              name="Close"
              size="small"
              appearance="secondary"
              onPress={onClose}
            />
            <Button
              style={styles.button}
              name={operationType === 'buy' ? `Buy ${shortName}` : `Sell ${shortName}`}
              size="small"
              onPress={handleSubmit(formSubmit)}
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modal,
  },

  modalContainer: {
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: Radius.radius20,
    marginHorizontal: 50,
    padding: 30,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Gaps.gap20,
  },

  button: {
    flex: 1,
  },

  title: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: FontSize.size20,
    marginBottom: 20,
  },
});
