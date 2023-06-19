import {ActivityIndicator, StyleSheet, Text, View, loading} from 'react-native';
import React from 'react';
import {useTheme} from '../context/ThemeProvider';
import Row from './Row';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';

const NearestLocations = ({title, icon, data, loading}) => {
  const {theme} = useTheme();
  return (
    <View style={{marginTop: 20, marginBottom: 10}}>
      <Row style={{marginBottom: 5}}>
        <MaterialCommunityIcons name={icon} size={17} color={colors.primary} />
        <Text style={styles.text}>Nearby {title}</Text>
      </Row>

      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : data.length > 0 ? (
        data.map((i, idx) => (
          <Row key={idx} style={{marginBottom: 10}}>
            <Text
              style={{flex: 1, color: theme.secondaryTextColor}}
              numberOfLines={2}>
              {i.placeName}
            </Text>
            <Text
              style={{
                textDecorationLine: 'underline',
                marginLeft: 10,
                color: theme.secondaryTextColor,
              }}>
              {i.placeDistance.toFixed(2)} km
            </Text>
          </Row>
        ))
      ) : (
        <Text>Nothing found!</Text>
      )}
    </View>
  );
};

export default NearestLocations;

const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
