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
import {confirmEmail} from '../redux/reducers/authReducer';
import {useTheme} from '../context/ThemeProvider';

const ConfirmEmailScreen = ({route}) => {
  const {theme} = useTheme();
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('SignInScreen');
  };

  const handleConfirmEmail = async values => {
    const result = await dispatch(confirmEmail(values));

    if (result?.error) return;

    if (route.params?.confirm) {
      navigation.goBack();
    } else {
      navigation.navigate('SignInScreen');
    }
  };

  const validationSchema = Yup.object().shape({
    code: Yup.number().required('Required').label('Code'),
  });
  return (
    <Screen>
      <View
        style={{
          paddingHorizontal: LIST_MARGIN,
        }}>
        <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
          Confirm Email
        </Text>

        <Formik
          enableReinitialize={true}
          initialValues={{
            code: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleConfirmEmail(values);
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

              <CustomButton title="Confirm" onPress={handleSubmit} />
            </>
          )}
        </Formik>

        {!route.params?.confirm ? (
          <CustomButton
            title="Back to Sign In"
            onPress={navigateToLogin}
            type="TERTIARY"
          />
        ) : (
          <CustomButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            type="TERTIARY"
          />
        )}
      </View>
    </Screen>
  );
};

export default ConfirmEmailScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: size.xxl,
    fontWeight: weight.full,
    marginVertical: 10,
  },
});
