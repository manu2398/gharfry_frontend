import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from './FormikForm/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {blockUserConversation} from '../redux/reducers/messageReducer';
import {useTheme} from '../context/ThemeProvider';
import {postDataApi} from '../utils/fetchData';

const data = [
  {label: 'Spam', value: 1},
  {label: 'Harassment', value: 2},
  {label: 'Inappropriate Content', value: 3},
  {label: 'Violence', value: 4},
  {label: 'Hate Speech', value: 5},
  // Add more reasons as needed
];

const ReportBox = ({cvId}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();
  const {theme} = useTheme();

  const handleReportSubmit = async () => {
    // Perform report submission logic here
    if (value) {
      dispatch(blockUserConversation({auth, cvId, value}));
      navigation.navigate('Chat');

      // Submit the report and show a success message
      Alert.alert('Report Submitted', 'User has been blocked.');

      // Reset the form
      setValue(null);
    } else {
      // Show an error message if any field is missing
      Alert.alert('Error', 'Please Select Type.');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
        Block Chat
      </Text>
      <Text style={{marginVertical: 20, color: theme.secondaryTextColor}}>
        Are you sure you want to block this user? You won't be able to chat with
        this person any more.
      </Text>

      <Dropdown
        style={[
          styles.dropdown,
          {borderColor: theme.borderColor},
          isFocus && {borderColor: theme.info},
        ]}
        placeholderStyle={[
          styles.placeholderStyle,
          {color: theme.secondaryTextColor},
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {color: theme.secondaryTextColor},
        ]}
        data={data}
        maxHeight={200}
        itemContainerStyle={{backgroundColor: theme.backgroundColor}}
        itemTextStyle={{color: theme.secondaryTextColor}}
        activeColor={theme.secondaryColor}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Tell us why' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />

      <CustomButton
        title="Submit Report"
        onPress={handleReportSubmit}
        type="SECONDARY"
        fgColor="tomato"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default ReportBox;
