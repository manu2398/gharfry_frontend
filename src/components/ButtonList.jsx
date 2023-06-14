import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {size, weight} from '../theme/fonts';
import {useTheme} from '../context/ThemeProvider';

const ButtonList = ({data, header, borderTop, marginTop}) => {
  const {theme} = useTheme();
  const getListHeader = () => {
    if (!header) return null;

    return (
      <View
        style={[
          styles.headerContainer,
          {marginTop: marginTop ? 35 : 0, borderColor: theme.borderColor},
        ]}>
        <Text style={[styles.headerText, {color: theme.primaryTextColor}]}>
          {header}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {borderTopWidth: borderTop ? 1 : 0, borderColor: theme.borderColor},
      ]}>
      {getListHeader()}
      {data.map(item => (
        <Pressable key={item.label} onPress={item.onPress}>
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              fontSize: size.md,
              color: theme.secondaryTextColor,
            }}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ButtonList;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 203, 164, 0.4)',
    borderBottomWidth: 1,
  },
  container: {
    borderBottomWidth: 1,
  },
  headerText: {
    fontWeight: weight.bold,
    marginLeft: 18,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
});
