import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import CustomButton from './CustomButton';

const SocialSignInButtons = () => {
  const navigation = useNavigation();
  const signUpGoogle = () => {
    console.warn('Google');
  };

  const signUpFacebook = () => {
    console.warn('Facebook');
  };

  const signUpPhone = () => {
    navigation.navigate('SignUpWithPhoneScreen');
  };
  return (
    <View>
      <CustomButton
        title="Sign up with Google"
        onPress={signUpGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        title="Sign up with Facebook"
        onPress={signUpFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      {/* <CustomButton
        title="Sign up with Phone Number"
        onPress={signUpPhone}
        bgColor="black"
        fgColor="white"
      /> */}
    </View>
  );
};

export default SocialSignInButtons;
