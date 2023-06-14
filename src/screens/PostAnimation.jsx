import {View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const PostAnimation = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}>
      <Lottie
        source={require('../assets/animations/postAnimation.json')}
        autoPlay
        style={{width: '50%', aspectRatio: 1}}
      />
    </View>
  );
};

export default PostAnimation;
