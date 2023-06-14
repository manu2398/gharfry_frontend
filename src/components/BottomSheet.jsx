import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
import {useTheme} from '../context/ThemeProvider';

const BottomSheetModal = ({children, isOpen, onClose, height = 500}) => {
  const {theme} = useTheme();

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            {height, backgroundColor: theme.backgroundColor},
          ]}>
          <>{children}</>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={{color: theme.info}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default BottomSheetModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
});
