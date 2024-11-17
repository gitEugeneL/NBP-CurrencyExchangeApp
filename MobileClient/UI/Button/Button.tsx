import { ButtonProps } from './Button.props';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, FontSize, Radius } from '../styles';

export default function Button({
  name,
  isLoading = false,
  appearance = 'primary',
  ...props
}: ButtonProps) {
  return (
    <Pressable {...props}>
      <View
        style={
          appearance === 'primary'
            ? [styles.button, styles.primaryButton]
            : [styles.button, styles.secondaryButton]
        }
      >
        {!isLoading && (
          <Text
            style={
              appearance === 'primary'
                ? [styles.text, styles.primaryText]
                : [styles.text, styles.secondaryText]
            }
          >
            {name}
          </Text>
        )}

        {isLoading && <ActivityIndicator size="large" color={Colors.white} />}
      </View>
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
  },

  primaryText: {
    color: Colors.white,
  },

  secondaryText: {
    color: Colors.primary,
  },
});
