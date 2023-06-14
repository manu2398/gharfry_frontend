import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Row from './Row';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import {useTheme} from '../context/ThemeProvider';

const RecentSearchButton = ({name, onPress}) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <Row style={[styles.container, {borderColor: theme.borderColor}]}>
        <MaterialCommunityIcons
          name="history"
          size={20}
          color={colors.primary}
        />
        <Text style={{marginLeft: 5, color: theme.secondaryTextColor}}>
          {name}
        </Text>
      </Row>
    </TouchableOpacity>
  );
};

export default RecentSearchButton;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
