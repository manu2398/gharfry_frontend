import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from '../context/ThemeProvider';

const CommonLoader = ({color = 'tomato'}) => {
  const {theme} = useTheme();
  return (
    <View
      style={{
        alignSelf: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: theme.backgroundColor,
      }}>
      <ActivityIndicator size={'small'} color={color} />
    </View>
  );
};

export default CommonLoader;
