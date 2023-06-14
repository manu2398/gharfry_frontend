import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CommonLoader = ({color = 'tomato'}) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        width: '100%',
        padding: 10,
      }}>
      <ActivityIndicator size={'small'} color={color} />
    </View>
  );
};

export default CommonLoader;
