import React from 'react';
import { View } from 'react-native';
import WarningCard from '../../components/WarningCard/WarningCard';

export default function SuccessPage() {
  return (
    <View>
      <WarningCard
        appearance="speed"
        title="You have been successfully registered!"
        buttonName="Login"
        redirectRoute="/auth/login"
      />
    </View>
  );
}
