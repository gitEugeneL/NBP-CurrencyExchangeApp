import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { WalletOperationModalProps } from './WalletOperationModal.props';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import MoneyInput from '../../../../../../components/MoneyInput/MoneyInput';
import Button from '../../../../../../UI/Button/Button';
import React from 'react';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../../../UI/styles';
import {
  WalletOperationSchema,
  WalletOperationValidationSchema,
} from './WalletOperationModal.schemes';

export default function WalletOperationModal({ ...props }: WalletOperationModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WalletOperationSchema>({
    resolver: yupResolver(WalletOperationValidationSchema(props.isWithdraw ? props.value : null)),
  });

  const formSubmit = (data: WalletOperationSchema) => {
    props.operation(data.amount, props.isWithdraw);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={props.isVisible}
      onRequestClose={props.onClose}
    >
      <BlurView intensity={10} style={styles.blurContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{props.isWithdraw ? 'Withdraw' : 'Add money'}</Text>

          <View>
            <MoneyInput
              label={`Personal: ${props.symbol} ${props.value}`}
              name="amount"
              shortName={props.shortName}
              control={control}
              keyboardType="numeric"
              errors={errors}
              placeholder={props.isWithdraw ? props.value.toString() : '0.00'}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              name="Close"
              size="small"
              appearance="secondary"
              onPress={props.onClose}
            />
            <Button
              style={styles.button}
              name={props.isWithdraw ? 'Withdraw' : 'Add money'}
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
