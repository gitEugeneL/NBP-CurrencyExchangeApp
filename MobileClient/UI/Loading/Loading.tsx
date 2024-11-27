import { ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../styles';
import React from 'react';

export default function Loading() {
  return <ActivityIndicator style={styles.loading} size={100} color={Colors.primary} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
