import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { ConfirmCreateProps } from './ConfirmCreate.props';
import { Colors, Fonts, FontSize, Gaps, Radius } from '../../../../../../UI/styles';
import Button from '../../../../../../UI/Button/Button';

export default function ConfirmCreate({ name, isVisible, onConfirm, onClose }: ConfirmCreateProps) {
  return (
    <Modal transparent={true} animationType="fade" visible={isVisible} onRequestClose={onClose}>
      <BlurView intensity={10} style={styles.blurContainer}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Creating {name} wallet?</Text>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              name="Close"
              size="small"
              appearance="secondary"
              onPress={onClose}
            />
            <Button style={styles.button} name="Create" size="small" onPress={onConfirm} />
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

  modalText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: FontSize.size20,
    marginBottom: 20,
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
