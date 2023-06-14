import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  // Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {Picker} from '@react-native-picker/picker';
import {useFormikContext} from 'formik';
import {useSelector} from 'react-redux';
import AppErrorMessage from './AppErrorMessage';
import {weight} from '../../theme/fonts';
import colors from '../../theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from '../Row';
import Screen from '../Screen';

// const SpecialPicker = ({
//   placeholder,
//   width,
//   data,
//   selectedItem,
//   onSelectItem,
//   name,
//   label,
// }) => {
//   const {errors, touched, setFieldValue, setFieldTouched, values} =
//     useFormikContext();

//   const {status} = useSelector(state => state);

//   const [showPicker, setShowPicker] = useState(false);
//   const [myItem, setMyItem] = useState('');

//   useEffect(() => {
//     if (status.onEdit) setFieldValue(name, status[name]);
//   }, [status]);

//   return (
//     <>
//       <View style={{width, marginTop: 15}}>
//         <Text style={styles.label}>{label}</Text>
//         <TouchableOpacity
//           style={styles.optionContainer}
//           onPress={() => {
//             setShowPicker(true);
//             setFieldTouched(name);
//           }}>
//           <Row>
//             {status.onEdit ? (
//               <Text style={{flex: 1}}>{selectedItem || status[name]}</Text>
//             ) : (
//               <Text style={{flex: 1}}>{selectedItem || 'Select'}</Text>
//             )}
//             <MaterialCommunityIcons name="chevron-down" size={20} />
//           </Row>
//         </TouchableOpacity>
//         <AppErrorMessage error={errors[name]} visible={touched[name]} />
//       </View>
//       <Modal visible={showPicker} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Picker
//             selectedValue={myItem}
//             onValueChange={itemValue => {
//               if (itemValue === 0) {
//                 onSelectItem('');
//                 setFieldValue(name, '');
//               }
//               setMyItem(itemValue);
//               onSelectItem(itemValue);
//               setFieldValue(name, itemValue);
//             }}>
//             {data.map(item => (
//               <Picker.Item
//                 key={item.label}
//                 label={item.label}
//                 value={item.value}
//               />
//             ))}
//           </Picker>
//           <TouchableOpacity
//             style={styles.closeButton}
//             onPress={() => setShowPicker(false)}>
//             <Text style={styles.closeButtonText}>Done</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </>
//   );
// };

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
  }, [status, name, setFieldValue]);
  return (
    <>
      <View style={{width, marginTop: 15}}>
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

      <Modal visible={modalVisible} animationType="fade">
        <Screen>
          <View style={{flexDirection: 'row'}}>
            <ScrollView style={{flex: 1, marginTop: 20}}>
              {data.map(item => (
                <TouchableOpacity
                  key={item.label}
                  onPress={() => handleSelectItem(name, item)}>
                  <Text
                    style={[
                      styles.label2,
                      item.label === 'Select' ? {fontWeight: weight.bold} : {},
                    ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <MaterialCommunityIcons
              name="close"
              onPress={() => setModalVisible(false)}
              style={styles.icon}
              size={30}
            />
          </View>
        </Screen>
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  closeButtonText: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  label: {
    padding: 5,
    fontWeight: weight.bold,
    color: colors.black,
  },
  label2: {
    padding: 15,
    flex: 1,
    fontWeight: weight.thin,
    color: colors.black,
  },
  optionContainer: {
    backgroundColor: 'white',

    borderRadius: 5,
    borderColor: colors.border,
    borderWidth: 1,

    width: '100%',

    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  container: {
    backgroundColor: 'white',

    borderRadius: 5,
    borderColor: colors.border,
    borderWidth: 1,

    width: '100%',

    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  // icon: {
  //   position: 'absolute',
  //   right: 10,
  //   top: 10,
  // },
});
