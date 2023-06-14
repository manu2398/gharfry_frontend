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
import {resetPassword} from '../redux/reducers/authReducer';
import {useTheme} from '../context/ThemeProvider';

const ResetPasswordScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleUpdatePassword = async values => {
    const result = await dispatch(resetPassword(values));

    if (result?.error) return;

    navigation.navigate('SignInScreen');
  };

  const navigateToLogin = () => {
    navigation.navigate('SignInScreen');
  };

  const validationSchema = Yup.object().shape({
    code: Yup.number().required('Required').label('Code'),
    password: Yup.string()
      .required('Required')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character',
      )
      .label('Password'),
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
            code: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleUpdatePassword(values);
            Keyboard.dismiss();
          }}>
          {({handleSubmit}) => (
            <>
              <AppTextInput
                placeholder="Enter confirmation code send to email"
                name="code"
                keyboardType="number-pad"
                label="Enter confirmation code"
              />
              <AppTextInput
                placeholder="Enter new password"
                name="password"
                secureTextEntry
                label="New Password"
              />
              <CustomButton title="Update" onPress={handleSubmit} />
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

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: size.xxl,
    fontWeight: weight.full,
    marginVertical: 10,
  },
});
