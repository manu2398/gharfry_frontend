import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Screen from '../components/Screen';
import {useDispatch, useSelector} from 'react-redux';

import Lottie from 'lottie-react-native';
import CommonLoader from '../components/CommonLoader';
import {LIST_MARGIN} from '../constants';
import {useTheme} from '../context/ThemeProvider';
import {
  NOTIFICATION_TYPES,
  clearAllNotifications,
  getNotifications,
  updateNotification,
} from '../redux/reducers/notificationReducer';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Row from '../components/Row';
import {size, weight} from '../theme/fonts';
import colors from '../theme/colors';
import formattedTimeStamp from '../utils/formattedTimeStamp';
import {getDataApi} from '../utils/fetchData';

const NotifyItem = ({item, onPress, theme}) => {
  return (
    <Pressable onPress={onPress} style={{paddingVertical: 20}}>
      <Row>
        {item?.id?.images[0].url && (
          <Image
            source={{uri: item.id.images[0].url}}
            style={{width: 50, aspectRatio: 1}}
          />
        )}
        <View style={{flex: 1, marginLeft: 10}}>
          <Text
            style={{
              color: theme.secondaryTextColor,
              fontSize: size.md,
              // textDecorationLine: 'underline',
            }}>
            {item.text}
          </Text>
          <Text
            style={{
              color: theme.secondaryTextColor,
              marginTop: 4,
              textDecorationLine: 'underline',
            }}>
            {formattedTimeStamp(item.createdAt)}
          </Text>
        </View>

        {!item.receiverHasRead && (
          <Entypo name="dot-single" size={25} color={colors.accent} />
        )}
      </Row>
    </Pressable>
  );
};

const NotificationScreen = () => {
  const {notify, auth} = useSelector(state => state);
  const dispatch = useDispatch();
  const {theme} = useTheme();
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);

  const renderNotifyItem = ({item}) => {
    const handlePress = () => {
      if (item.id)
        navigation.navigate('PropertyDetailScreen', {id: item.id._id});

      dispatch(updateNotification({id: item._id, auth}));
    };

    return <NotifyItem item={item} onPress={handlePress} theme={theme} />;
  };

  const handleClearAll = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete all notifications?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            dispatch(clearAllNotifications({auth}));
          },
        },
        {text: 'No'},
      ],
    );
  };

  const handleLoadMore = useCallback(async () => {
    if (load) return;

    if (notify.count <= 10 * (notify.page - 1)) return;
    setLoad(true);

    const res = await getDataApi(
      `notification?limit=${10}&page=${notify.page}`,
      auth.token,
    );

    dispatch({
      type: NOTIFICATION_TYPES.NOTIFY_PAGINATION,
      payload: {
        notifications: res.data.notifications,
        count: res.data.count,
        total: res.data.total,
      },
    });
    setLoad(false);
  }, [load, dispatch, notify.count, notify.page]);

  if (notify.notifications.length === 0) {
    return (
      <View style={[styles.noNotify, {backgroundColor: theme.backgroundColor}]}>
        <Lottie
          source={require('../assets/animations/notFound.json')}
          autoPlay
          style={{width: '50%', aspectRatio: 1}}
        />
        <Text style={{color: theme.secondaryTextColor}}>
          No Notifications yet!
        </Text>
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.container}>
        <Row style={{justifyContent: 'space-between'}}>
          <Pressable onPress={handleClearAll}>
            <Text
              style={{
                color: colors.accent,
                textDecorationLine: 'underline',
                fontWeight: weight.bold,
                marginVertical: 10,
              }}>
              Clear all
            </Text>
          </Pressable>
        </Row>
        {notify.loading && <CommonLoader />}
        <FlatList
          data={notify.notifications}
          keyExtractor={item => Math.floor(Math.random() * 100000)}
          renderItem={renderNotifyItem}
          contentContainerStyle={styles.notifyList}
          ItemSeparatorComponent={() => (
            <View
              style={[styles.separator, {backgroundColor: theme.borderColor}]}
            />
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onRefresh={() => dispatch(getNotifications({auth}))}
          refreshing={refresh}
        />
      </View>
      {load && <CommonLoader />}
    </Screen>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: LIST_MARGIN,
    marginTop: 15,
  },
  notifyList: {
    paddingVertical: 16,
  },
  noNotify: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
  },
});
