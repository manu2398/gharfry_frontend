import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddPropertyScreen from '../screens/AddPropertyScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import FilterScreen from '../screens/FilterScreen';
import FindLocationScreen from '../screens/FindLocationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PropertyDetailScreen from '../screens/PropertyDetailScreen';
import RootTabNavigator from './RootTabNavigator';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import SavedPropertiesScreen from '../screens/SavedPropertiesScreen';
import AuthNavigator from './AuthNavigator';
import {useTheme} from '../context/ThemeProvider';
import NotificationScreen from '../screens/NotificationScreen';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TCScreen from '../screens/TCScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const {theme} = useTheme();
  return (
    <Stack.Navigator initialRouteName="RootTab">
      <Stack.Screen
        component={RootTabNavigator}
        name="RootTab"
        options={{headerShown: false}}
      />

      <Stack.Screen
        component={AuthNavigator}
        name="AuthStack"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={FindLocationScreen}
        name="FindLocationScreen"
        options={{
          presentation: 'modal',
          animation: 'default',
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={PropertyDetailScreen}
        name="PropertyDetailScreen"
        options={{
          // presentation: 'modal',
          // animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditProfileScreen}
        name="EditProfileScreen"
        options={{
          title: 'Edit Profile',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.primaryTextColor,
        }}
      />
      <Stack.Screen
        component={AddPropertyScreen}
        name="AddPropertyScreen"
        options={{
          title: 'Add Property',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.primaryTextColor,
        }}
      />
      <Stack.Screen
        component={ProfileScreen}
        name="ProfileScreen"
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.primaryTextColor,
        }}
      />
      <Stack.Screen
        component={FilterScreen}
        name="FilterScreen"
        options={{
          presentation: 'modal',
          animation: 'default',
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={ChatDetailScreen}
        name="ChatDetailScreen"
        options={{
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.primaryTextColor,
        }}
      />
      <Stack.Screen
        component={SavedPropertiesScreen}
        name="SavedPropertiesScreen"
        options={{
          headerTitle: '',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.primaryTextColor,
        }}
      />

      <Stack.Screen
        component={NotificationScreen}
        name="NotificationScreen"
        options={{
          headerTitle: 'My Notifications',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.primaryTextColor,
        }}
      />
      <Stack.Screen
        component={PrivacyPolicy}
        name="PrivacyPolicy"
        options={{
          headerTitle: 'Privacy Policy',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.primaryTextColor,
        }}
      />
      <Stack.Screen
        component={TCScreen}
        name="TCScreen"
        options={{
          headerTitle: 'Terms & Conditions',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.primaryTextColor,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
