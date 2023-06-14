import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Row from './Row';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {size, weight} from '../theme/fonts';
import {useTheme} from '../context/ThemeProvider';

const ModalHeader = ({xShown, text, style, onPress}) => {
  const {theme} = useTheme();

  if (text) {
    return (
      <Row style={[styles.container, {borderBottomColor: theme.borderColor}]}>
        {xShown ? (
          <MaterialCommunityIcons
            name="close"
            color="black"
            size={24}
            style={[styles.x, {color: theme.secondaryTextColor}]}
            onPress={onPress}
          />
        ) : null}
        <Text style={[styles.header, {color: theme.secondaryTextColor}]}>
          {text}
        </Text>
      </Row>
    );
  }

  //   return <View style={styles.container}></View>;
};

export default ModalHeader;

const styles = StyleSheet.create({
  x: {position: 'absolute', left: 10},
  container: {
    justifyContent: 'center',
    padding: 15,
    borderBottomWidth: 1,
  },
  header: {
    fontSize: size.lg,
    fontWeight: weight.bold,
  },
});
