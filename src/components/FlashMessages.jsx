import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoader from './CustomLoader';
import {weight} from '../theme/fonts';
import colors from '../theme/colors';

const FlashMessages = () => {
  const {alert} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert?.error || alert?.success) {
      const timeout = setTimeout(handleRemove, 4000); // Hide after 300 milliseconds

      return () => clearTimeout(timeout); // Clean up the timeout on component unmount
    }
  }, [alert]);
  const handleRemove = () => {
    dispatch({type: 'ALERT', payload: {}});
  };

  if (alert?.loading) {
    return <CustomLoader />;
  }

  if (alert?.success) {
    return (
      <Pressable onPress={handleRemove} style={styles.container}>
        <Text style={styles.text}>{alert.success}</Text>
      </Pressable>
    );
  }

  if (alert?.error) {
    return (
      <Pressable style={styles.container} onPress={handleRemove}>
        <Text style={styles.text}>{alert.error}</Text>
      </Pressable>
    );
  }
};

export default FlashMessages;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    bottom: 160,
    alignSelf: 'center',
    zIndex: 99999,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderColor: colors.border,
    flex: 1,
  },
  text: {color: 'white', fontWeight: weight.normal, fontSize: 13},
});
