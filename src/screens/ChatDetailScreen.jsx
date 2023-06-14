import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomSheetModal from '../components/BottomSheet';
import ReportBox from '../components/ReportBox';
import CommonLoader from '../components/CommonLoader';
import {addMessage, getMessages} from '../redux/reducers/messageReducer';
import {LIST_MARGIN} from '../constants';
import colors from '../theme/colors';
import {weight} from '../theme/fonts';
import {useTheme} from '../context/ThemeProvider';

const ChatDetailScreen = ({route}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [text, setText] = useState('');
  const {auth, socket, message} = useSelector(state => state);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {item} = route.params;

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: false});
    }, 200);
  }, []);

  useEffect(() => {
    if (item?.conversation) {
      navigation.setOptions({
        headerRight: () =>
          !item.blocked && (
            <Pressable onPress={handleOpenModal}>
              <FontAwesome5
                name="user-alt-slash"
                size={14}
                color={colors.grey}
              />
            </Pressable>
          ),
      });
    }
  }, [item?.blocked, item?.conversation, navigation]);

  useEffect(() => {
    navigation.setOptions({headerTitle: item.fullname});
  }, [item, navigation]);

  useEffect(() => {
    const getMessagesData = async () => {
      await dispatch(
        getMessages({auth, id: item._id, conversationId: item.conversation}),
      );
    };

    getMessagesData();
  }, [item._id, item.conversation, dispatch, auth]);

  const handleMessage = () => {
    const msg = {
      id: item.id,
      sender: auth.user._id,
      recipient: item._id,
      text,
      image: item.image,
      receiverHasRead: false,
      conversationId: item.conversation || undefined,
    };

    dispatch(addMessage({msg, auth, socket}));

    setText('');
    Keyboard.dismiss();
  };

  if (message.loading) {
    return <CommonLoader />;
  }

  return (
    <>
      <KeyboardAvoidingView
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 95 : 0}>
        <ScrollView
          contentContainerStyle={styles.chatContainer}
          keyboardShouldPersistTaps="handled"
          ref={scrollViewRef}>
          {message.data.map((msg, idx) => (
            <View
              key={idx}
              style={[
                styles.messageContainer,
                (msg.propId || msg.id) === item.id &&
                msg.sender === auth.user._id
                  ? styles.userMessageContainer
                  : styles.botMessageContainer,
              ]}>
              {(msg.propId || msg.id) === item.id &&
                msg.sender !== auth.user._id && (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ProfileScreen', {id: msg.sender})
                    }
                    style={styles.avatarContainer}>
                    <Image source={{uri: item.avatar}} style={styles.avatar} />
                  </Pressable>
                )}
              {(msg.propId || msg.id) === item.id && (
                <View style={styles.messageContent}>
                  <Text style={styles.messageText}>{msg.text}</Text>
                  <Text style={styles.timestamp}>
                    {new Date(msg.createdAt || Date.now()).toLocaleString(
                      'en-IN',
                      {
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        year: '2-digit',
                      },
                    )}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PropertyDetailScreen', {id: item.id})
          }
          style={[
            styles.propertyButton,
            item.blocked
              ? {backgroundColor: colors.accent}
              : {backgroundColor: theme.secondaryColor},
          ]}>
          <Text
            style={[styles.propertyButtonText, {color: theme.primaryTextColor}]}
            numberOfLines={1}>
            {item.address}
          </Text>
        </TouchableOpacity>
        {item.blocked && (
          <Text style={{alignSelf: 'center', color: colors.accent}}>
            {item?.blockedId === auth.user._id
              ? 'You blocked this user'
              : 'You have been blocked'}
          </Text>
        )}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.backgroundColor,
              borderTopColor: theme.borderColor,
            },
          ]}>
          {item.propertyActive ? (
            <>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.secondaryColor,
                    color: theme.primaryTextColor,
                  },
                ]}
                placeholder="Type your message..."
                placeholderTextColor={theme.secondaryTextColor}
                value={text}
                onChangeText={setText}
                selectionColor={colors.primary}
              />
              <TouchableOpacity
                style={[styles.sendButton, !text && {opacity: 0.5}]}
                disabled={!text || item.blocked}
                onPress={handleMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.propertySoldText}>
              Property has been marked as sold by the owner, you cannot chat any
              further.
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
      <BottomSheetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        height={500}>
        <ReportBox cvId={item?.conversation} />
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    padding: 16,
    paddingTop: 50,
    paddingBottom: 50,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  botMessageContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageContent: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#EAEAEA',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  propertyButton: {
    position: 'absolute',
    width: '100%',
    paddingVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: LIST_MARGIN,
  },
  propertyButtonText: {
    fontWeight: weight.bold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 99,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  propertySoldText: {
    color: colors.accent,
  },
});

export default ChatDetailScreen;
