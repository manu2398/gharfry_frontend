import {View} from 'react-native';
import React from 'react';

const Row = ({children, style}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default Row;
