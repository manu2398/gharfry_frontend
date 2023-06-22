import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Card from './Card';
import {size, weight} from '../theme/fonts';
import {useTheme} from '../context/ThemeProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from './Row';
import {useDispatch, useSelector} from 'react-redux';
import {useLocationContext} from '../context/CurrentLocationContext';

import CommonLoader from './CommonLoader';
import {getRecentProps} from '../redux/reducers/recentlyAddedReducer';

const RecentlyAddedProperties = () => {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const {location} = useLocationContext();
  const {auth, recentProps} = useSelector(state => state);

  useEffect(() => {
    dispatch(
      getRecentProps({
        auth,
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      }),
    );
  }, [location]);
  return (
    <View>
      <Row style={{justifyCintent: 'center'}}>
        <MaterialCommunityIcons
          name="bed-single-outline"
          size={25}
          style={{color: theme.info, marginTop: 14}}
        />
        <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
          Recently Added{' '}
          {!location || location === 'notGranted' ? `` : `near you`}
        </Text>
      </Row>
      {recentProps.loading ? (
        <CommonLoader />
      ) : recentProps.recentProperties.length > 0 ? (
        <ScrollView horizontal>
          {recentProps.recentProperties.map(item => (
            <View key={item._id} style={{flex: 1, marginRight: 34}}>
              <Card item={item} widthOfCard={280} height={120} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={{color: theme.secondaryTextColor}}>
          No Properties found!
        </Text>
      )}
    </View>
  );
};

export default RecentlyAddedProperties;

const styles = StyleSheet.create({
  heading: {
    fontSize: size.md,
    fontWeight: weight.bold,
    marginTop: 20,
    marginBottom: 5,
  },
});
