import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Row from './Row';
import colors from '../theme/colors';
import {size, weight} from '../theme/fonts';
import Antdesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '../context/ThemeProvider';

const Amenities = ({amenities, style, mainScreen}) => {
  const {theme} = useTheme();

  return (
    <View
      style={
        mainScreen ? [style, {paddingHorizontal: 20, marginVertical: 20}] : null
      }>
      {mainScreen && (
        <Text style={[styles.heading, {color: theme.primaryTextColor}]}>
          Amenities
        </Text>
      )}
      <Row style={{flexWrap: 'wrap'}}>
        {amenities.map((item, idx) => (
          <Row
            style={[styles.widget, {backgroundColor: theme.backgroundColor}]}
            key={item.key}>
            <Antdesign name="checkcircle" color={colors.primary} />
            <Text style={[styles.widgetText, {color: theme.primaryTextColor}]}>
              {item.value}
            </Text>
          </Row>
        ))}
      </Row>
    </View>
  );
};

export default Amenities;

const styles = StyleSheet.create({
  widget: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.primary,
    marginRight: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  widgetText: {
    fontWeight: weight.semi,
    fontSize: size.sm,
    marginLeft: 5,
  },
  heading: {
    fontSize: size.lg,
    fontWeight: weight.bold,
    marginBottom: 10,
  },
});
