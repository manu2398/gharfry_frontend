import AuthNavigator from './AuthNavigator';
import HomeStack from './HomeStack';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getMe} from '../redux/reducers/authReducer';

import io from 'socket.io-client';
import {endPoint} from '../constants';
import {SOCKET} from '../redux/reducers/socketReduces';
import SocketClient from '../SocketClient';
import {useNetInfo} from '@react-native-community/netinfo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {size} from '../theme/fonts';
import {TYPES} from '../redux/reducers/filterReducer';
import SplashScreen from '../screens/SplashScreen';
import {useLocationContext} from '../context/CurrentLocationContext';

const RootNavigation = () => {
  const netInfo = useNetInfo();
  const {auth, splash} = useSelector(state => state);
  const dispatch = useDispatch();
  const {location} = useLocationContext();

  useEffect(() => {
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      dispatch({
        type: TYPES.ADDFILTER,
        payload: {
          text: 'All',
          id: 0,
          width: 60,
          beds: 0,
          distance: 1,
        },
      });
      dispatch(getMe());
      const socket = io(endPoint);

      dispatch({type: SOCKET, payload: socket});

      return () => socket.close();
    }
  }, [dispatch, netInfo]);

  if (
    (netInfo.type === 'unknown' || netInfo.type === 'none') &&
    netInfo.isInternetReachable === false
  ) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <MaterialCommunityIcons name="access-point-network-off" size={44} />
        <Text style={styles.noInternet}>No Internet Connection found</Text>
      </View>
    );
  }

  if (auth.token === undefined) {
    return <SplashScreen />;
  }

  return auth?.token ? (
    <>
      <HomeStack />
      <SocketClient />
    </>
  ) : (
    <AuthNavigator />
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  noInternet: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: size.lg,
  },
});
