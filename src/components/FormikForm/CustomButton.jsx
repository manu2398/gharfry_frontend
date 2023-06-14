import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';
import {size, weight} from '../../theme/fonts';

const CustomButton = ({title, onPress, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 10,
    borderRadius: 5,

    marginTop: 15,
  },
  container_PRIMARY: {
    backgroundColor: colors.primary,
  },
  container_SECONDARY: {
    backgroundColor: 'transparent',
  },
  container_TERTIARY: {
    backgroundColor: 'white',
  },
  text_PRIMARY: {
    color: 'white',
  },
  text_SECONDARY: {
    color: colors.info,
  },
  text_TERTIARY: {
    color: 'black',
  },
  text: {
    fontWeight: weight.bold,
    fontSize: size.md,
  },
});
