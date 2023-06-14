import {View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {useTheme} from '../context/ThemeProvider';

const CustomLoader = () => {
  const {theme} = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: theme.backgroundColor,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}>
      <Lottie
        source={require('../assets/animations/spinnerAnimation.json')}
        autoPlay
        style={{width: '50%', aspectRatio: 1}}
      />
    </View>
  );
};

export default CustomLoader;
