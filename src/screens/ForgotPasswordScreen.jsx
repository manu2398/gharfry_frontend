import {Text, StyleSheet, View, Keyboard} from 'react-native';
import Screen from '../components/Screen';
import {LIST_MARGIN} from '../constants';
import {size, weight} from '../theme/fonts';
import CustomButton from '../components/FormikForm/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AppTextInput from '../components/FormikForm/AppTextInput';
import {useDispatch} from 'react-redux';
import {forgotPassword} from '../redux/reducers/authReducer';
import {useTheme} from '../context/ThemeProvider';

const ForgotPasswordScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSendCode = async values => {
    const result = await dispatch(forgotPassword(values));

    if (result?.error) return;

    navigation.navigate('ResetPasswordScreen');
  };

  const navigateToLogin = () => {
    navigation.navigate('SignInScreen');
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Required')
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      )
      .label('Email'),
  });
  return (
    <Screen>
      <View style={{paddingHorizontal: LIST_MARGIN}}>
        <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
          Reset your Password
        </Text>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleSendCode(values);
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

              <CustomButton title="Send Code" onPress={handleSubmit} />
            </>
          )}
        </Formik>

        <CustomButton
          title="Back to Sign In"
          onPress={navigateToLogin}
          type="TERTIARY"
        />
      </View>
    </Screen>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: size.xxl,
    fontWeight: weight.full,
    marginVertical: 10,
  },
});
