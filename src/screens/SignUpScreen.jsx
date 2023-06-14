import {Text, StyleSheet, ScrollView, Keyboard} from 'react-native';
import Screen from '../components/Screen';
import {LIST_MARGIN} from '../constants';
import {size, weight} from '../theme/fonts';
import CustomButton from '../components/FormikForm/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AppTextInput from '../components/FormikForm/AppTextInput';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {register} from '../redux/reducers/authReducer';
import {useTheme} from '../context/ThemeProvider';

const SignUpScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToLogin = () => {
    navigation.navigate('SignInScreen');
  };

  const handleFormSubmit = async values => {
    const result = await dispatch(register(values));
    if (result?.error) return;

    navigation.navigate('ConfirmEmailScreen');
  };

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Required').label('Full name'),
    email: Yup.string()
      .required('Required')
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      )
      .label('Email'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      )
      .label('Password'),
    cPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .label('Confirm Password'),
  });
  return (
    <Screen style={{paddingHorizontal: LIST_MARGIN}}>
      <ScrollView style={{paddingHorizontal: LIST_MARGIN}}>
        <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
          Sign Up
        </Text>
        <Formik
          enableReinitialize={true}
          initialValues={{
            fullname: '',
            email: '',
            password: '',
            cPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleFormSubmit(values);
            Keyboard.dismiss();
          }}>
          {({handleSubmit}) => (
            <>
              <AppTextInput
                name="fullname"
                placeholder="Full name"
                label="Full name"
              />
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
              <AppTextInput
                name="cPassword"
                placeholder="Confirm Password"
                secureTextEntry={true}
                label="Confirm Password"
              />
              <CustomButton title="Sign Up" onPress={handleSubmit} />

              <Text
                style={{marginVertical: 10, color: theme.secondaryTextColor}}>
                By Signing up, you agree with our T&C and privacy policy.
              </Text>

              {/* <SocialSignInButtons /> */}

              <CustomButton
                title="Already have an account? Sign in"
                onPress={navigateToLogin}
                type="SECONDARY"
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </Screen>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: size.xxl,
    fontWeight: weight.full,
    marginVertical: 10,
  },
});
