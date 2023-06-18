import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import {weight} from '../../theme/fonts';
import {useFormikContext} from 'formik';
import AppErrorMessage from './AppErrorMessage';
import {useSelector} from 'react-redux';
import {useTheme} from '../../context/ThemeProvider';
import colors from '../../theme/colors';

const AppTextInput = ({label, name, width, ...otherProps}) => {
  const {theme} = useTheme();

  const {
    handleChange,
    setFieldTouched,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormikContext();
  const {status} = useSelector(state => state);
  useEffect(() => {
    if (status.onEdit) setFieldValue(name, status[name]?.toString());
  }, [status]);
  return (
    <View style={width ? {width} : {width: '100%', marginTop: 15}}>
      {label && (
        <Text
          style={{
            marginBottom: 10,
            fontWeight: weight.bold,
            color: theme.secondaryTextColor,
            marginBottom: 4,
          }}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.container,
          {
            borderColor: theme.borderColor,
            backgroundColor: theme.backgroundColor,
          },
        ]}>
        <TextInput
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
          value={values[name]}
          placeholderTextColor={theme.secondaryTextColor}
          style={{
            fontSize: 17,
            backgroundColor: theme.backgroundColor,
            color: theme.secondaryTextColor,
          }}
          cursorColor={colors.primary}
          selectionColor={colors.primary}
        />
      </View>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,

    width: '100%',

    paddingHorizontal: 5,
    paddingVertical: Platform.OS === 'ios' ? 15.5 : 0,
    alignItems: 'stretch',
  },
});
