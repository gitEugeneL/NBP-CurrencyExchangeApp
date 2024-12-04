import {
  MoneyOperationSchema,
  MoneyOperationValidationSchema,
} from './MoneyOperationModal.schemes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MoneyOperationModalProps } from './MoneyOperationModal.props';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import MoneyInput from '../../../../../../components/MoneyInput/MoneyInput';
import Button from '../../../../../../UI/Button/Button';
import React from 'react';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../../../UI/styles';

export default function MoneyOperationModal({
  isWithdraw,
  value,
  shortName,
  symbol,
  isVisible,
  onClose,
  operation,
}: MoneyOperationModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MoneyOperationSchema>({
    resolver: yupResolver(MoneyOperationValidationSchema(isWithdraw ? value.toString() : null)),
  });

  const formSubmit = (data: MoneyOperationSchema) => {
    operation(data.amount, isWithdraw);
  };

  return (
    <Modal transparent={true} animationType="fade" visible={isVisible} onRequestClose={onClose}>
      <BlurView intensity={10} style={styles.blurContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{isWithdraw ? 'Withdraw' : 'Add money'}</Text>

          <View>
            <MoneyInput
              label={`Personal: ${symbol} ${value}`}
              name="amount"
              shortName={shortName}
              control={control}
              keyboardType="numeric"
              errors={errors}
              placeholder={isWithdraw ? value.toString() : '0.00'}
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
              name={isWithdraw ? 'Withdraw' : 'Add money'}
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
