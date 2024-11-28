import { Modal, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Colors, Gaps, Radius } from '../../../../../../UI/styles';
import { AddMoneyProps } from './AddMoney.props';
import Button from '../../../../../../UI/Button/Button';
import MoneyInput from '../../../../../../components/MoneyInput/MoneyInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddMoneySchema, AddMoneyValidationSchema } from './AddMoney.schemes';

export default function AddMoney({
  value,
  shortName,
  symbol,
  isVisible,
  onClose,
  onAddMoney,
}: AddMoneyProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddMoneySchema>({
    resolver: yupResolver(AddMoneyValidationSchema),
  });

  const formSubmit = (data: AddMoneySchema) => {
    onAddMoney(data.amount);
  };

  return (
    <Modal transparent={true} animationType="fade" visible={isVisible} onRequestClose={onClose}>
      <BlurView intensity={10} style={styles.blurContainer}>
        <View style={styles.modalContainer}>
          <View>
            <MoneyInput
              label={`Personal: ${symbol} ${value}`}
              name="amount"
              shortName={shortName}
              control={control}
              keyboardType="numeric"
              errors={errors}
              placeholder="0.00"
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
              name="Add money"
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
});
