import React, {useState, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from './Marker';
import colors from '../theme/colors';
import CardHorizontal from './CardHorizontal';
import {useLocationContext} from '../context/CurrentLocationContext';

const Map = ({properties, mapRef, initialRegion, itPark}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const {auth, filter} = useSelector(state => state);
  const {location} = useLocationContext();

  const handlePress = idx => {
    if (Platform.OS === 'ios') {
      mapRef.current?.animateCamera({
        center: {
          latitude: properties[idx].latitude,
          longitude: properties[idx].longitude,
        },
      });
    }
    setActiveIndex(idx);
  };

  const defaultInitialRegion = {
    latitude:
      !location || location === 'notGranted'
        ? 30.744958966516066
        : location?.coords.latitude,
    longitude:
      !location || location === 'notGranted'
        ? 76.81056978447793
        : location?.coords.longitude,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  };

  const handleMapPress = () => {
    // setActiveIndex(-5);
  };

  const handleItParkPress = () => {
    setActiveIndex(-2);
  };

  const showHeart = item => {
    const got = item.likes.filter(p => p === auth.user._id);
    return got.length > 0;
  };

  const memoizedMarkers = useMemo(
    () =>
      properties.map((item, idx) => (
        <MapMarker
          key={item._id}
          lat={item.latitude}
          lng={item.longitude}
          onPress={() => handlePress(idx)}
          color={activeIndex === idx ? colors.info : colors.primary}
          size={32}
          heart={showHeart(item)}
        />
      )),
    [properties, activeIndex],
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        onPress={handleMapPress}
        initialRegion={initialRegion ? initialRegion : defaultInitialRegion}
        minZoomLevel={Math.round(
          14 - Math.log2(filter?.distance || 1000 / 500),
        )}
        toolbarEnabled={false}
        showsUserLocation>
        {memoizedMarkers}
        {itPark && (
          <>
            <Circle
              center={{
                latitude: itPark.location.lat,
                longitude: itPark.location.lng,
              }}
              radius={filter?.distance * 1000 || 1000} // Adjust the radius as desired (measured in meters)
              strokeWidth={0.5}
              fillColor={'rgba(0, 0, 255, 0.05)'} // Adjust the shade color and opacity as desired
            />

            <MapMarker
              lat={itPark.location.lat}
              lng={itPark.location.lng}
              color={colors.black}
              size={42}
              onPress={handleItParkPress}
            />
          </>
        )}
      </MapView>
      {activeIndex > -1 && (
        <CardHorizontal item={properties[activeIndex]} style={styles.card} />
      )}
      {activeIndex === -2 && (
        <CardHorizontal
          item={itPark}
          style={styles.card}
          fromIT={true}
          fromMap={false}
        />
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  card: {
    position: 'absolute',
    bottom: 10,
    zIndex: 999,
  },
});
