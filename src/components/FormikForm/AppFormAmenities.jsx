import React, {memo, useEffect, useState, useCallback} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFormikContext} from 'formik';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from '../Row';
import ModalHeader from '../ModalHeader';
import {useTheme} from '../../context/ThemeProvider';
import AppErrorMessage from './AppErrorMessage';
import Screen from '../Screen';
import {weight} from '../../theme/fonts';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  label: {
    padding: 15,
    fontWeight: weight.thin,
  },
});

const AppFormAmenities = ({name, label, width, myData, setMyData}) => {
  const {theme} = useTheme();
  const {setFieldValue, touched, errors} = useFormikContext();
  const {status} = useSelector(state => state);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (status.onEdit) {
      setFieldValue(name, status.amenities);

      const mergedArray = [...myData, ...status.amenities].reduce(
        (acc, curr) => {
          const index = acc.findIndex(obj => obj.key === curr.key);
          if (index === -1) {
            acc.push(curr);
          } else {
            acc[index].selected = acc[index].selected || curr.selected;
          }
          return acc;
        },
        [],
      );

      setMyData(mergedArray);
    }
  }, [status]);

  const handleItemSelect = useCallback(
    item => {
      const newData = myData.map(v => {
        if (v.key === item.key) {
          return {...v, selected: !v.selected};
        } else {
          return v;
        }
      });

      setMyData(newData);
      const dataTrue = newData.filter(data => data.selected);
      setFieldValue(name, dataTrue);
    },
    [myData, setMyData, name, setFieldValue],
  );

  return (
    <>
      <View style={{width, marginTop: 15}}>
        {label && (
          <Text
            style={{
              marginTop: 10,
              fontWeight: weight.bold,
              color: theme.secondaryTextColor,
              marginBottom: 4,
            }}>
            {label}
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.container,
            {
              backgroundColor: theme.backgroundColor,
              borderColor: theme.borderColor,
            },
          ]}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Row>
            <Text
              style={{flex: 1, color: theme.secondaryTextColor, fontSize: 16}}>
              Select Amenities
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color={theme.secondaryTextColor}
            />
          </Row>
        </TouchableOpacity>
        <AppErrorMessage error={errors[name]} visible={touched[name]} />
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <ModalHeader
            xShown
            text="Select relevant amenities"
            onPress={() => setModalVisible(false)}
          />
          <View style={{flex: 1}}>
            <ScrollView style={{flex: 1, marginTop: 10}}>
              <View>
                {myData.map(item => (
                  <TouchableOpacity
                    key={item.key}
                    onPress={() => {
                      handleItemSelect(item);
                    }}>
                    <Text
                      style={[
                        styles.label,
                        {color: theme.primaryTextColor},
                        item.selected ? {color: 'red'} : null,
                      ]}>
                      {item.value}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </Screen>
      </Modal>
    </>
  );
};

export default memo(AppFormAmenities);
