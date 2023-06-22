import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GoogleLogo} from '../logos/GoogleLogo';

import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  loginWithGoogle,
  registerWithGoogle,
} from '../../redux/reducers/authReducer';
import colors from '../../theme/colors';
import {useTheme} from '../../context/ThemeProvider';
// import {FacebookLogo} from '../logos/FacebookLogo';
// import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const SocialSignInButtons = ({signUp = false}) => {
  const dispatch = useDispatch();
  const {theme} = useTheme();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '143677054014-d5o7feh61n0rllic1512mjm15jfr9dsl.apps.googleusercontent.com',
    });
  }, []);

  const signUpGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      if (signUp && user) {
        dispatch(registerWithGoogle(user));
      } else {
        dispatch(loginWithGoogle(user));
      }
    } catch (error) {
      // dispatch({
      //   type: 'ALERT',
      //   payload: {
      //     error:
      //       'Cannot get to google at the moment, Please try another sign in method',
      //   },
      // });
    }
  };

  // const signUpFacebook = async () => {
  //   try {
  //     const result = await LoginManager.logInWithPermissions([
  //       'public_profile',
  //       'email',
  //     ]);

  //     if (result.isCancelled) {
  //       throw 'User cancelled the login process';
  //     }

  //     // Once signed in, get the users AccesToken
  //     const data = await AccessToken.getCurrentAccessToken();

  //     if (!data) {
  //       throw 'Something went wrong obtaining access token';
  //     }

  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //     dispatch({
  //       type: 'ALERT',
  //       payload: {
  //         error:
  //           'Cannot get to facebook at the moment, Please try another sign in method',
  //       },
  //     });
  //   }
  // };

  // const signUpPhone = () => {
  //   navigation.navigate('SignUpWithPhoneScreen');
  // };
  return (
    <View>
      <TouchableOpacity
        style={[styles.gbutton, {borderColor: theme.borderColor}]}
        onPress={signUpGoogle}>
        {/* specific margins to line up with the other social buttons */}
        <GoogleLogo style={styles.glogo} />
        <Text style={styles.gtext}>
          {signUp ? 'Sign up with Google' : 'Sign in with Google'}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.fbutton} onPress={signUpFacebook}>
        <FacebookLogo style={styles.flogo} />
        <Text style={styles.ftext}>
          {signUp ? 'Sign up with Facebook' : 'Sign in with Facebook'}
        </Text>
      </TouchableOpacity> */}

      {/* <CustomButton
        title="Sign up with Phone Number"
        onPress={signUpPhone}
        bgColor="black"
        fgColor="white"
      />  */}
    </View>
  );
};

const styles = StyleSheet.create({
  gbutton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    backgroundColor: 'white',
    height: 52,
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  glogo: {marginLeft: 10, marginTop: 1},
  gtext: {
    color: '#36454f',
    alignSelf: 'center',
    marginLeft: 40, // specific margins to line up with the other social buttons
    fontWeight: 'bold',
    fontSize: 15,
  },
  fbutton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#3b5998',
    height: 50,
  },
  flogo: {marginLeft: 10, marginTop: 1},
  ftext: {
    color: '#fff',
    alignSelf: 'center',
    marginLeft: 40, // specific margins to line up with the other social buttons
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default SocialSignInButtons;
