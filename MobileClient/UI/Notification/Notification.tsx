import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { NotificationProps } from './notification.pros';
import { Colors, Fonts, FontSize } from '../styles';

export default function Notification({ notificationError }: NotificationProps) {
  const [isShown, setIsShown] = useState<boolean>(false);

  const opacity = useSharedValue(0);

  useEffect(() => {
    if (!notificationError) {
      return;
    }
    setIsShown(true);
    opacity.value = withTiming(1, { duration: 300 });
    const timerId = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 300 });
      setTimeout(() => setIsShown(false), 300);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [notificationError]);

  // Стиль для анимации
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isShown) {
    return null;
  }

  return (
    <Animated.View style={[styles.error, animatedStyle]}>
      <Text style={styles.text}>{notificationError}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  error: {
    position: 'absolute',
    top: 20,
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.red,
    padding: 15,
  },
  text: {
    fontSize: FontSize.size16,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: Fonts.regular,
  },
});
