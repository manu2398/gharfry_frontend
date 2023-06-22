import {Text, StyleSheet, View, Keyboard} from 'react-native';
import Screen from '../components/Screen';
import {LIST_MARGIN} from '../constants';
import {size, weight} from '../theme/fonts';
import CustomButton from '../components/FormikForm/CustomButton';
import {useNavigation} from '@react-navigation/native';
import colors from '../theme/colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AppTextInput from '../components/FormikForm/AppTextInput';
import {login} from '../redux/reducers/authReducer';
import {useDispatch} from 'react-redux';
import {useTheme} from '../context/ThemeProvider';
import SocialSignInButtons from '../components/FormikForm/SocialSignInButtons';

const SignInScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = values => {
    dispatch(login(values));
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const navigateToRegister = () => {
    navigation.navigate('SignUpScreen');
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Required')
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      )
      .label('Email'),
    password: Yup.string().required('Required').label('Password'),
  });

  return (
    <Screen>
      <View style={{paddingHorizontal: LIST_MARGIN}}>
        <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
          Sign In
        </Text>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleLogin(values);
            Keyboard.dismiss();
          }}>
          {({handleSubmit}) => (
            <>
              <AppTextInput
                name="email"
                placeholder="Email"
                label="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <AppTextInput
                name="password"
                placeholder="Password"
                secureTextEntry={true}
                label="Password"
              />
              <CustomButton title="Sign in" onPress={handleSubmit} />
              <CustomButton
                title="Forgot Password?"
                onPress={handleForgotPassword}
                type="SECONDARY"
                fgColor="#DD4D44"
              />
              <SocialSignInButtons />

              <CustomButton
                title="Don't have an account? Sign Up now"
                onPress={navigateToRegister}
                type="SECONDARY"
              />
            </>
          )}
        </Formik>
      </View>
    </Screen>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: size.xxl,
    color: colors.grey,
    fontWeight: weight.full,
    marginVertical: 10,
  },
});
