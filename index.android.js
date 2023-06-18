/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App.android';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';

if (Platform.OS === 'android') {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}

AppRegistry.registerComponent(appName, () => App);
