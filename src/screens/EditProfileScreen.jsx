import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import Screen from '../components/Screen';
import CustomButton from '../components/FormikForm/CustomButton';
import {LIST_MARGIN} from '../constants';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import AppTextInput from '../components/FormikForm/AppTextInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfileUser} from '../redux/reducers/profileReducer';
import {useTheme} from '../context/ThemeProvider';

const EditProfileScreen = ({route}) => {
  const {theme} = useTheme();

  const {fullname, avatar, bio} = route.params;
  const {auth} = useSelector(state => state);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(null);

  const handleUpdatePicture = async () => {
    await launchImageLibrary(
      {mediaType: 'photo', quality: 0.5},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (!didCancel && !errorCode) {
          setProfileImage(assets[0]);
        }
      },
    );
  };

  const handleEditProfile = values => {
    const result = dispatch(
      updateProfileUser(auth, {
        ...values,
        avatar: profileImage?.uri || auth.user.avatar,
      }),
    );
    if (result.error) return;

    navigation.goBack();
  };

  const validationSchema = Yup.object().shape({
    bio: Yup.string().required('Required').max(200).label('Bio'),
    fullname: Yup.string().required('Required').label('Full Name'),
  });

  return (
    <Screen>
      <View style={{alignSelf: 'center'}}>
        <Image
          source={{
            uri: profileImage?.uri || avatar,
          }}
          style={styles.image}
        />
        <TouchableOpacity onPress={handleUpdatePicture}>
          <Text style={[styles.text, {color: theme.info}]}>
            Change Profile Picture
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: LIST_MARGIN}}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            bio,
            fullname,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleEditProfile(values);
          }}>
          {({handleSubmit}) => (
            <>
              <AppTextInput
                name="fullname"
                label="Full Name"
                placeholder="Update name"
              />
              <AppTextInput
                name="bio"
                label="Bio"
                // multiline={true}
                placeholder="Add a Bio"
              />

              <CustomButton
                title="Update Profile"
                type="TERTIARY"
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </Screen>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  image: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 90,
    marginTop: 20,
  },
  text: {
    marginVertical: 10,
  },
});
