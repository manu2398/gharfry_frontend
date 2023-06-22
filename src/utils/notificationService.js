import messaging from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../navigation/NavigationService';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
}

const getFcmToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      const fcmToken = await messaging().getToken();
      console.log('tokkeenn', fcmToken);
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken); // fcm token is a string
      }
    }
  } catch (err) {
    console.log(err, 'err in fcm token');
  }
};

export const notificationListener = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message has arrived', JSON.stringify(remoteMessage));
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    setTimeout(() => {
      NavigationService?.navigate(remoteMessage.data.type); // e.g. "Settings"
    }, 300);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
        setTimeout(() => {
          NavigationService?.navigate(remoteMessage.data.type); // e.g. "Settings"
        }, 3000);
      }
    });

  //   return unsubscribe;
};
