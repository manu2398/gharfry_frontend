import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import {weight} from '../theme/fonts';
import Row from '../components/Row';
import {useLocationContext} from '../context/CurrentLocationContext';

const SplashScreen = () => {
  const {location} = useLocationContext();
  const animation = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      startAnimation();
    }, 20);
  }, []);

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {});
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
    // Animation completed, fade in the text
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
      }}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 100], // Adjust the outputRange to control the final position
                }),
              },
            ],
          },
        ]}>
        <MaterialCommunityIcons name="fire" size={50} color="white" />
      </Animated.View>
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textOpacity,
          },
        ]}>
        <Text style={styles.text}>GharFry</Text>
      </Animated.View>
      {!location && (
        <View style={{marginTop: 20}}>
          <Row>
            <ActivityIndicator size={'small'} color={'white'} />
            <Text style={{color: 'white', marginLeft: 5}}>
              Getting your location
            </Text>
          </Row>
        </View>
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: -50,
    marginRight: 20,
  },
  text: {
    fontSize: 40,
    color: 'white',
    fontWeight: weight.full,
  },
});
