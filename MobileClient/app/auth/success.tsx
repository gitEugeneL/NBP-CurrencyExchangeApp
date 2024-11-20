import SuccessCard from '../../components/SuccessCard/SuccessCard';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Gaps } from '../../UI/styles';

export default function SuccessPage() {
  return (
    <View style={styles.container}>
      <SuccessCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: Gaps.gap20,
  },
});
