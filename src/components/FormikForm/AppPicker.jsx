import {
  Modal,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from '../Row';
import Screen from '../Screen';
import {weight} from '../../theme/fonts';
import {useFormikContext} from 'formik';
import AppErrorMessage from './AppErrorMessage';
import {useSelector} from 'react-redux';

const AppPicker = ({
  placeholder,
  width,
  data,
  selectedItem,
  onSelectItem,
  name,
  label,
}) => {
  const {errors, touched, setFieldValue, setFieldTouched, values} =
    useFormikContext();
  const [modalVisible, setModalVisible] = useState(false);
  const {status} = useSelector(state => state);

  const handleSelectItem = (name, item) => {
    setModalVisible(false);
    onSelectItem(item);
    setFieldValue(name, item.value);
  };

  useEffect(() => {
    if (status.onEdit) setFieldValue(name, status[name]);
  }, [status, setFieldValue, name]);
  return (
    <>
      <View style={{width}}>
        {label && (
          <Text style={{marginTop: 10, fontWeight: weight.bold}}>{label}</Text>
        )}
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            setModalVisible(true);
            setFieldTouched(name);
          }}>
          <Row>
            {status.onEdit ? (
              <Text style={{flex: 1}}>
                {selectedItem?.label || status[name]}
              </Text>
            ) : (
              <Text style={{flex: 1}}>
                {selectedItem?.label || placeholder}
              </Text>
            )}
            <MaterialCommunityIcons name="chevron-down" size={20} />
          </Row>
        </TouchableOpacity>
        <AppErrorMessage error={errors[name]} visible={touched[name]} />
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          {data.map(item => (
            <TouchableOpacity
              key={item.label}
              onPress={() => handleSelectItem(name, item)}>
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}
          {/* <MaterialCommunityIcons
            name="close"
            onPress={() => setModalVisible(false)}
            style={styles.icon}
            size={30}
          /> */}
        </Screen>
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    borderRadius: 5,
    borderColor: colors.border,
    borderWidth: 1,

    width: '100%',

    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  label: {
    padding: 15,
    fontWeight: weight.thin,
    color: colors.black,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
