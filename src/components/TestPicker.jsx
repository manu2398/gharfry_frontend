import {useFormikContext} from 'formik';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppErrorMessage from './FormikForm/AppErrorMessage';
import {useSelector} from 'react-redux';
import {weight} from '../theme/fonts';
import {useTheme} from '../context/ThemeProvider';

const TestPicker = ({
  name,
  data,
  selectedItem,
  onSelectItem,
  label,
  makeDisable,
  placeText,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {errors, touched, setFieldValue, setFieldTouched, values} =
    useFormikContext();
  const {status} = useSelector(state => state);

  useEffect(() => {
    if (status.onEdit) setFieldValue(name, status[name]);
  }, [status, setFieldValue, name]);

  const {theme} = useTheme();

  return (
    <View style={{marginVertical: 10}}>
      <View style={{backgroundColor: theme.backgroundColor}}>
        {label && (
          <Text
            style={[
              {
                marginBottom: 5,
                fontWeight: weight.bold,
                color: theme.secondaryTextColor,
              },
              isFocus && {color: theme.info},
            ]}>
            {label}
          </Text>
        )}
        {/* {renderLabel()} */}
        <Dropdown
          style={[
            styles.dropdown,
            {borderColor: theme.borderColor},
            isFocus && {borderColor: theme.info},
            {width: '100%'},
          ]}
          disable={makeDisable}
          placeholderStyle={[
            styles.placeholderStyle,
            {color: theme.secondaryTextColor},
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            {color: theme.secondaryTextColor},
          ]}
          itemContainerStyle={{backgroundColor: theme.backgroundColor}}
          itemTextStyle={{color: theme.secondaryTextColor}}
          iconStyle={styles.iconStyle}
          activeColor={theme.secondaryColor}
          data={data}
          maxHeight={300}
          autoScroll={false}
          dropdownPosition={'auto'}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={status.onEdit ? selectedItem || status[name] : value}
          onFocus={() => {
            setIsFocus(true);
            setFieldTouched(name);
          }}
          onBlur={() => {
            setIsFocus(false);
            // setFieldTouched(name);
          }}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            setFieldValue(name, item.value);
            onSelectItem(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? theme.info : theme.secondaryTextColor}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
      {placeText && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: 200,
            color: theme.secondaryTextColor,
          }}>
          {status?.onEdit
            ? '*Cannot change property type while editing property.'
            : '*Property type cannot be changed later.'}
        </Text>
      )}
    </View>
  );
};

export default TestPicker;

const styles = StyleSheet.create({
  dropdown: {
    height: 52,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
