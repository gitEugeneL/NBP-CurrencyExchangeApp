import { ButtonProps } from './Button.props';
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { Colors, FontSize, Radius } from '../styles';

export default function Button({
  name,
  isLoading = false,
  appearance = 'primary',
  ...props
}: ButtonProps) {
  const animatedValue = new Animated.Value(100);

  // Интерполяция цвета для анимации
  const animatedColor = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange:
      appearance === 'primary'
        ? [Colors.primaryHover, Colors.primary]
        : [Colors.primary, Colors.transparent],
  });

  const fadeIn = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
    props.onPressIn && props.onPressIn(e);
  };

  const fadeOut = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: true,
    }).start();
    props.onPressOut && props.onPressOut(e);
  };

  return (
    <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View
        style={[
          styles.button,
          appearance === 'primary' ? styles.primaryButton : styles.secondaryButton,
          { backgroundColor: animatedColor },
        ]}
      >
        {!isLoading && <Text style={styles.text}>{name}</Text>}

        {isLoading && <ActivityIndicator size="large" color={Colors.white} />}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: Radius.radius10,
  },

  primaryButton: {
    backgroundColor: Colors.primary,
  },

  secondaryButton: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  text: {
    fontSize: FontSize.size18,
    color: Colors.white,
  },
});
