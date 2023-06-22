import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountScreen from '../screens/AccountScreen';
import ChatScreen from '../screens/ChatScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchUserScreen from '../screens/SearchUserScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {getConversations} from '../redux/reducers/messageReducer';
import {useTheme} from '../context/ThemeProvider';
import FryScreen from '../screens/FryScreen';
import colors from '../theme/colors';
import {size, weight} from '../theme/fonts';
import {Image, Text, TouchableOpacity} from 'react-native';
import Row from '../components/Row';
import BottomSheetModal from '../components/BottomSheet';
import {useNavigation} from '@react-navigation/native';
import PayBox from '../components/PayBox';
import {getNotifications} from '../redux/reducers/notificationReducer';

const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  const {theme} = useTheme();
  const {auth, message, notify} = useSelector(state => state);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (message.firstLoad) return;

    if (auth.token) dispatch(getConversations({auth}));
  }, [dispatch, auth, message.firstLoad]);

  useEffect(() => {
    if (notify.firstLoad) return;

    dispatch(getNotifications({auth}));
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          } else if (route.name === 'Account') {
            iconName = 'person-circle-outline';
          } else if (route.name === 'Fry') {
            iconName = 'aperture-outline';
          }

          // Return the Ionicons component with the corresponding icon name
          return <Ionicons name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: theme.nav.active,
        tabBarInactiveTintColor: theme.nav.inActive,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: theme.backgroundColor},
      })}>
      <Tab.Screen
        name="Fry"
        component={FryScreen}
        options={{
          headerTitle: () => (
            <Row>
              <Ionicons
                name={'aperture-outline'}
                size={23}
                color={colors.primary}
              />
              <Text
                style={{
                  fontWeight: weight.bold,
                  fontSize: size.lg,
                  color: colors.primary,
                  marginLeft: 5,
                }}>
                Gharfry.com
              </Text>
            </Row>
          ),
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
          },

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Account')}
              style={{marginLeft: 10, marginBottom: 0}}>
              <Image
                style={{
                  width: 27,
                  aspectRatio: 1,
                  borderRadius: 20,
                  borderColor: theme.borderColor,
                  borderWidth: 1,
                }}
                source={{uri: auth.user.avatar}}
              />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              onPress={handleOpenModal}
              style={{marginRight: 10}}>
              <Row>
                <Text style={{color: 'black'}}>💰</Text>
                <Text
                  style={{
                    color: theme.primaryTextColor,
                    fontWeight: weight.bold,
                  }}>
                  {auth.user.credits}
                </Text>
              </Row>
              <BottomSheetModal isOpen={isModalOpen} onClose={handleCloseModal}>
                <PayBox />
              </BottomSheetModal>
            </TouchableOpacity>
          ),

          headerShadowVisible: true,
        }}
      />
      <Tab.Screen name="Home" component={SearchScreen} />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        // initialParams={{focusScreen: 'Chat'}}
        options={{
          // headerShown: true,
          // title: 'Messages',
          tabBarBadge:
            message.unreadMessages.length === 0
              ? null
              : message.unreadMessages.length,
        }}
      />
      <Tab.Screen
        name="Search"
        options={
          {
            // tabBarBadge: `P I D`,
            // tabBarStyle: {backgroundColor: 'pink'},
          }
        }
        component={SearchUserScreen}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                width: 25,
                aspectRatio: 1,
                borderRadius: 20,
                borderColor: theme.borderColor,
                borderWidth: 1,
                ...(focused && {borderWidth: 1, borderColor: colors.primary}),
              }}
              source={{uri: auth.user.avatar}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabNavigator;
