import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {size, weight} from '../theme/fonts';
import Screen from '../components/Screen';
import colors from '../theme/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from '../components/Row';
import {useNavigation} from '@react-navigation/native';
import ButtonList from '../components/ButtonList';
import {useDispatch, useSelector} from 'react-redux';
import {
  accountScreenVerification,
  deleteUser,
  logout,
} from '../redux/reducers/authReducer';
import CommonLoader from '../components/CommonLoader';
import {useState} from 'react';
import BottomSheetModal from '../components/BottomSheet';
import PayBox from '../components/PayBox';
import {useTheme} from '../context/ThemeProvider';

const AccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {auth} = useSelector(state => state);
  const {theme} = useTheme();

  const [imageLoad, setImageLoad] = useState(false);
  const handleImageLoad = () => {
    setImageLoad(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const PropertyButtons = [
    {
      label: 'Add a Property',
      onPress: () => {
        dispatch({type: 'STATUS', payload: {}});
        navigation.navigate('AddPropertyScreen');
      },
    },
    {
      label: 'My Properties',
      onPress: () => navigation.navigate('ProfileScreen', {id: auth.user._id}),
    },
    {
      label: 'Favorite Properties',
      onPress: () => navigation.navigate('SavedPropertiesScreen'),
    },
  ];

  const SupportButtons = [
    // {
    //   label: 'Feedback',
    //   onPress: () => console.log('navigate to feedback screen'),
    // },
    {
      label: 'Terms and  Conditions',
      onPress: () => navigation.navigate('TCScreen'),
    },
    {
      label: 'Privacy policy',
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
  ];

  const AccountButtons = [
    {
      label: 'Recharge My Credits',
      onPress: handleOpenModal,
    },
    {
      label: 'Edit Profile',
      onPress: () => handleEditProfile(),
    },
    {
      label: 'Delete Account',
      onPress: () => handleDeleteUser(),
    },
    {
      label: 'Logout',
      onPress: () => handleLogout(),
    },
  ];

  const handleLogout = async () => {
    dispatch(logout(auth));
  };

  const handleDeleteUser = async () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? All your properties, conversations and credits will be deleted permanently',
      [
        {
          text: 'Yes',
          onPress: () => dispatch(deleteUser(auth)),
        },
        {text: 'No'},
      ],
    );
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen', {
      avatar: auth.user.avatar,
      bio: auth.user?.bio,
      fullname: auth.user.fullname,
    });
  };

  return (
    <Screen>
      <ScrollView>
        <Row style={styles.user}>
          <>
            {!imageLoad && <CommonLoader />}
            <Image
              source={{
                uri: auth?.user.avatar,
              }}
              style={[styles.avatar, !imageLoad && styles.hiddenImage]}
              onLoad={handleImageLoad}
            />
          </>
          <View style={{flex: 1, marginLeft: 10}}>
            <Row>
              <Text style={[styles.name, {color: theme.primaryTextColor}]}>
                {auth?.user.fullname}
              </Text>
              {!auth.user.verified && (
                <Pressable
                  onPress={() => {
                    dispatch(accountScreenVerification({auth}));
                    navigation.navigate('AuthStack', {
                      screen: 'ConfirmEmailScreen',
                      params: {
                        confirm: true,
                      },
                    });
                  }}>
                  <MaterialCommunityIcons
                    name="email-alert-outline"
                    size={24}
                    color={colors.accent}
                    style={{marginLeft: 15}}
                  />
                </Pressable>
              )}
            </Row>
            <Row>
              <Text style={{marginRight: 5, color: theme.secondaryTextColor}}>
                Joined:{' '}
                {new Date(auth?.user.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                })}
              </Text>
              <Octicons
                name="verified"
                size={14}
                color={auth.user.verified ? colors.primary : colors.grey}
              />
            </Row>
          </View>
          <Pressable onPress={handleOpenModal}>
            <Row>
              <Text style={{color: 'black'}}>💰</Text>
              <Text
                style={{
                  fontWeight: weight.bold,
                  color: theme.primaryTextColor,
                }}>
                {auth?.user.credits}
              </Text>
            </Row>
          </Pressable>
        </Row>
        <Text style={[styles.bio, {color: theme.secondaryTextColor}]}>
          {auth?.user?.bio}
        </Text>
        <ButtonList data={PropertyButtons} header="Properties" borderTop />
        <ButtonList data={AccountButtons} header="Account" />
        <ButtonList data={SupportButtons} header="Policies" />
      </ScrollView>
      <BottomSheetModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PayBox />
      </BottomSheetModal>
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  user: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: {
    fontSize: size.lg,
    color: 'black',
  },
  bio: {
    marginBottom: 18,
    color: 'black',
    paddingHorizontal: 10,
  },
  hiddenImage: {
    opacity: 0, // Hide the image until it is loaded
  },
});
