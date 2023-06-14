import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../theme/colors';

const AppErrorMessage = ({error, visible}) => {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
};

export default AppErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: colors.accent,
  },
});
