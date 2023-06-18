import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  AppState,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Screen from '../components/Screen';
import {LIST_MARGIN} from '../constants';
import Row from '../components/Row';
import {size, weight} from '../theme/fonts';
import {
  MESS_TYPE,
  addItem,
  getConversations,
} from '../redux/reducers/messageReducer';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../theme/colors';
import Lottie from 'lottie-react-native';
import CommonLoader from '../components/CommonLoader';
import {getDataApi} from '../utils/fetchData';
import {useTheme} from '../context/ThemeProvider';
import CustomLoader from '../components/CustomLoader';

const ChatItem = React.memo(({item, onPress}) => {
  const {theme} = useTheme();
  const [imageLoad, setImageLoad] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoad(true);
  }, []);

  return (
    <Pressable style={styles.chatItem} onPress={onPress}>
      <Row>
        <Image
          source={{uri: item.image}}
          style={[
            styles.image,
            !imageLoad && styles.hiddenImage,
            !item.propertyActive || item.blocked ? {opacity: 0.5} : {},
          ]}
          onLoad={handleImageLoad}
        />
        <View style={styles.body}>
          <Row style={{justifyContent: 'space-between'}}>
            <Text
              style={[
                styles.chatUser,
                item.blocked
                  ? {color: colors.accent}
                  : {color: theme.primaryTextColor},
              ]}>
              {item.fullname}
            </Text>
            <Text
              style={{
                color: item.blocked ? colors.accent : theme.secondaryTextColor,
                fontSize: size.sm,
                marginLeft: 10,
              }}>
              {new Date(item.cvDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'numeric',
              })}
            </Text>
          </Row>
          <Text
            style={[
              styles.locationText,
              item.blocked
                ? {color: colors.accent}
                : {color: theme.secondaryTextColor},
            ]}
            numberOfLines={1}>
            {item.address}
          </Text>
          <Row style={{justifyContent: 'space-between'}}>
            {!item.propertyActive ? (
              <Text style={{color: colors.accent}}>
                Property has been marked as sold
              </Text>
            ) : (
              <Text
                style={[
                  styles.lastMessage,
                  item.blocked ? {color: colors.accent} : {color: theme.info},
                ]}
                numberOfLines={1}>
                {item.text}
              </Text>
            )}
          </Row>
        </View>
        {item.unreadMessages?.length > 0 && (
          <View style={styles.unreadMessagesBadge}>
            <Text style={styles.unreadMessagesText}>
              {item.unreadMessages?.length}
            </Text>
          </View>
        )}
      </Row>
    </Pressable>
  );
});

const ChatScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {auth, message} = useSelector(state => state);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(false);
  const {theme} = useTheme();
  const flatListRef = useRef();
  const [aState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        setAppState(nextAppState);
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, []);

  useEffect(() => {
    if (aState === 'active') {
      dispatch(getConversations({auth}));
    }
  }, [aState]);

  useEffect(() => {
    flatListRef?.current?.scrollToOffset({offset: 0});
    if (route.params) {
      dispatch(addItem({item: route.params.data, message}));
    }
  }, [route.params, dispatch]);

  const handleLoadMore = useCallback(async () => {
    if (load) return;

    if (message.count <= 10 * (message.page - 1)) return;
    setLoad(true);

    const res = await getDataApi(
      `conversations?limit=${10}&page=${message.page}`,
      auth.token,
    );

    const res1 = await getDataApi('unread-messages', auth.token);

    let newArr = [];

    res.data.chats.forEach(item => {
      item.recipients.forEach(cv => {
        if (item.propertyId === null) return;
        if (cv._id !== auth.user._id) {
          newArr.push({
            ...cv,
            text: item.text,
            id: item.propertyId._id,
            address: item.propertyId.address,
            image: item.image,
            unreadMessages: [...res1.data.messages].filter(
              i => item._id === i.conversation,
            ),
            conversation: item._id,
            propertyActive: item.propertyId.propertyActive,
            cvDate: item.createdAt,
            blocked: item?.blocked,
            blockedId: item?.blocked_by,
            userId: item.propertyId.userId._id,
          });
        }
      });
    });

    dispatch({
      type: MESS_TYPE.MESS_PAGINATION,
      payload: {newArr, count: res.data.count, total: res.data.total},
    });
    setLoad(false);
  }, [auth.token, auth.user._id, dispatch, load, message.count, message.page]);

  const renderChatItem = useCallback(
    ({item}) => {
      const handlePress = () => {
        navigation.navigate('ChatDetailScreen', {item});
      };

      return <ChatItem item={item} onPress={handlePress} />;
    },
    [navigation],
  );

  // if (message.loading) {
  //   return <CommonLoader />;
  // }

  return (
    <Screen>
      <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
        Recent Conversations
      </Text>

      {message.loading && <CommonLoader />}

      <View style={styles.container}>
        {message.items.length === 0 && !message.loading ? (
          <View
            style={[styles.noChat, {backgroundColor: theme.backgroundColor}]}>
            <Lottie
              source={require('../assets/animations/noChat.json')}
              autoPlay
              style={{width: '50%', aspectRatio: 1}}
            />
            <Text style={{color: theme.secondaryTextColor}}>No Chats yet!</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={message.items}
            keyExtractor={(item, idx) => item.conversation || idx.toString()}
            renderItem={renderChatItem}
            contentContainerStyle={styles.chatList}
            ItemSeparatorComponent={() => (
              <View
                style={[styles.separator, {backgroundColor: theme.borderColor}]}
              />
            )}
            onRefresh={() => dispatch(getConversations({auth}))}
            refreshing={refresh}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
          />
        )}
      </View>
      {load && <CommonLoader />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: LIST_MARGIN,
    marginTop: 15,
  },
  chatList: {
    paddingVertical: 16,
  },
  chatItem: {
    paddingVertical: 22,
  },
  chatUser: {
    fontSize: size.md,
    fontWeight: weight.bold,
  },
  separator: {
    height: 1,
  },
  image: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    marginLeft: 15,
  },
  locationText: {
    fontSize: size.normal,
  },
  lastMessage: {
    fontWeight: weight.thin,
    color: colors.info,
  },
  noChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: weight.full,
    marginTop: 10,
    paddingHorizontal: LIST_MARGIN,
  },
  hiddenImage: {
    opacity: 0, // Hide the image until it is loaded
  },
  unreadMessagesBadge: {
    backgroundColor: colors.accent,
    borderRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: 5,
  },
  unreadMessagesText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: weight.bold,
  },
});

export default ChatScreen;
