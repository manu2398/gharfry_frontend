import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {size, weight} from '../theme/fonts';
import colors from '../theme/colors';
import {useTheme} from '../context/ThemeProvider';

const Resources = ({property}) => {
  const {theme} = useTheme();

  const getItem = ({item, name}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item || '_ _'}</Text>
          <Text style={[styles.itemLabel, {color: theme.secondaryTextColor}]}>
            {name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, , {color: theme.primaryTextColor}]}>
        Property Resources
      </Text>
      <View style={styles.itemsContainer}>
        {getItem({item: property.beds, name: 'Bedroom'})}
        {getItem({item: property.baths, name: 'Bathroom'})}
        {getItem({
          item: property.sqft.toLocaleString('en-IN'),
          name: 'Sq. Ft.',
        })}
        {getItem({item: property.floor, name: 'Floor'})}
        {getItem({item: property.furnishing, name: 'Furnishing'})}
        {getItem({item: property.tenantType, name: 'Tenants'})}
        {getItem({item: property.sharingType, name: 'Sharing'})}
        {getItem({item: property.commercial, name: 'Commercial type'})}
      </View>
    </View>
  );
};

export default Resources;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 99, 71, 0.06)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 40,
  },
  heading: {
    fontSize: size.lg,
    fontWeight: weight.bold,
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemContainer: {
    alignItems: 'center',
    margin: 15,
  },
  itemContent: {
    alignItems: 'center',
  },
  itemText: {
    fontSize: size.md,
    fontWeight: weight.bold,
    color: colors.primary,
  },
  itemLabel: {
    fontSize: size.sm,
    marginTop: 5,
    textAlign: 'center',
  },
});
