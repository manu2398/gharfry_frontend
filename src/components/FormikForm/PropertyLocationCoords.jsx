import React, {useState, useRef, useEffect, memo} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  FlatList,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../theme/colors';
import Row from '../Row';
import {LIST_MARGIN} from '../../constants';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Screen from '../Screen';
import {useLocationContext} from '../../context/CurrentLocationContext';
import {getSuggestedLocations, getGeometry} from '../../../services/location';
import MapMarker from '../Marker';
import {useFormikContext} from 'formik';
import AppErrorMessage from './AppErrorMessage';
import {useTheme} from '../../context/ThemeProvider';
import {size} from '../../theme/fonts';

const styles1 = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingBottom: 20,
    zIndex: 1000,
    elevation: 10,
    paddingTop: Platform.OS === 'ios' ? 44 : LIST_MARGIN,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    width: '82%',
    padding: 10,
    marginLeft: 5,
    flex: 1,
  },
  container2: {
    borderBottomWidth: 1,
  },
});

const SuggestedText = memo(({locationItem}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles1.container2, {borderBottomColor: theme.borderColor}]}>
      <Text
        style={{
          padding: 10,
          fontWeight: '600',
          color: theme.secondaryTextColor,
        }}>
        {locationItem.description || locationItem.name}
      </Text>
    </View>
  );
});

const PropertyLocationCoords = ({getCoordinates, setGetCoordinates, name}) => {
  const {theme} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const {location} = useLocationContext();
  const [value, setValue] = useState('');
  const [locationName, setLocationName] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [markerCoords, setMarkerCoords] = useState({lat: null, lng: null});
  const mapRef = useRef();
  const {setFieldValue, errors, setFieldTouched, touched} = useFormikContext();

  useEffect(() => {
    if (getCoordinates?.latitude) {
      setFieldValue('geometry', {
        latitude: getCoordinates.latitude,
        longitude: getCoordinates.longitude,
      });
    }
  }, [getCoordinates?.latitude]);

  const requestLocationAccessAsync = () => {
    if (!location || location === 'notGranted') {
      Alert.alert('Settings', 'Please allow your location access', [
        {
          text: 'Allow',
          onPress: () => Linking.openSettings(),
        },
        {text: 'Cancel'},
      ]);
      return;
    }
    setLocationName('Current Location');
    mapRef?.current?.animateCamera({
      center: {
        latitude: Number(location?.coords?.latitude),
        longitude: Number(location?.coords?.longitude),
      },
    });
  };

  const handleSubmit = async item => {
    setModal2Visible(false);

    if (Platform.OS === 'android') setModalVisible(true);

    const geometry = await getGeometry(item?.place_id);

    if (Platform.OS === 'ios') setModalVisible(true);
    if (geometry) {
      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(geometry.location.lat),
          longitude: Number(geometry.location.lng),
        },
      });
    }

    setSuggestions([]);
    setLocationName(item?.description);
  };

  const handleChange = async val => {
    setValue(val);
    if (val.length > 2) {
      const locations = await getSuggestedLocations(val);
      if (locations.length > 0) {
        setSuggestions(locations);
      }
    } else if (val.length === 0) setSuggestions([]);
  };

  const handleMapPress = region => {
    const {latitude, longitude} = region.nativeEvent.coordinate;
    setMarkerCoords({
      lat: latitude,
      lng: longitude,
    });

    setGetCoordinates({latitude, longitude});

    setFieldValue('geometry', {latitude, longitude});
  };

  return (
    <>
      <TouchableOpacity
        style={{
          marginVertical: 15,
        }}
        onPress={() => {
          setModalVisible(true);
          setFieldTouched(name);
        }}>
        <Row
          style={{
            backgroundColor: theme.secondaryColor,
            padding: 5,
            borderRadius: 5,
          }}>
          <MaterialCommunityIcons
            name="map-outline"
            size={28}
            color={colors.primary}
          />
          <Text
            style={{
              fontWeight: 'bold',
              flex: 1,
              marginLeft: 5,
              color: theme.secondaryTextColor,
            }}>
            Tap on me to mark your exact property location on Map*
          </Text>
        </Row>
        <AppErrorMessage error={errors[name]} visible={touched[name]} />
      </TouchableOpacity>

      <Screen>
        <Modal visible={modalVisible}>
          <View
            style={[
              styles1.container,
              {backgroundColor: theme.backgroundColor},
            ]}>
            <Row style={{marginTop: 10}}>
              <TouchableOpacity
                style={[styles.input, {borderColor: theme.borderColor}]}
                onPress={() => {
                  setModalVisible(false);
                  setModal2Visible(true);
                }}>
                <Text
                  numberOfLines={1}
                  style={{color: theme.secondaryTextColor}}>
                  {locationName
                    ? locationName
                    : 'Search your property location'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={requestLocationAccessAsync}
                style={{marginLeft: 10}}>
                <MaterialIcons
                  name="my-location"
                  size={26}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{marginLeft: 10}}>
                <MaterialIcons
                  name="close"
                  size={26}
                  color={theme.secondaryTextColor}
                />
              </TouchableOpacity>
            </Row>
            <Text
              style={{
                marginTop: 10,
                marginLeft: 10,
                color: theme.secondaryTextColor,
              }}>
              Go to your property location and tap on it to mark it
            </Text>
          </View>

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles1.map}
            initialRegion={{
              latitude:
                getCoordinates?.latitude ||
                location?.coords?.latitude ||
                30.725695232847386,
              longitude:
                getCoordinates?.longitude ||
                location?.coords?.longitude ||
                76.75398788491377,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            minZoomLevel={17}
            ref={mapRef}
            onPress={handleMapPress}>
            {markerCoords?.lat || getCoordinates?.latitude ? (
              <MapMarker
                lat={
                  markerCoords.lat ? markerCoords.lat : getCoordinates?.latitude
                }
                lng={
                  markerCoords.lng
                    ? markerCoords.lng
                    : getCoordinates?.longitude
                }
                size={40}
                color={colors.primary}
              />
            ) : null}
          </MapView>
        </Modal>
      </Screen>

      <Modal visible={modal2Visible}>
        <Screen style={{paddingHorizontal: LIST_MARGIN}}>
          <Row style={{marginTop: 10}}>
            <TextInput
              placeholder="Try.. Quark City, Mohali"
              placeholderTextColor={theme.secondaryTextColor}
              value={value}
              onChangeText={handleChange}
              style={[
                styles1.input,
                {borderColor: theme.borderColor, color: theme.primaryTextColor},
              ]}
              autoFocus
              selectionColor={colors.primary}
              keyboardType="default"
            />
            <Pressable
              onPress={() => {
                setModal2Visible(false);
                setModalVisible(true);
              }}>
              <Text
                style={{
                  color: theme.info,
                  fontSize: size.md,
                  marginHorizontal: 5,
                }}>
                cancel
              </Text>
            </Pressable>
          </Row>
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={item => {
                item.reference;
              }}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleSubmit(item)}>
                  <SuggestedText locationItem={item} />
                </TouchableOpacity>
              )}
            />
          )}
        </Screen>
      </Modal>
    </>
  );
};

export default React.memo(PropertyLocationCoords);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingBottom: 20,
    zIndex: 1000,
    elevation: 10,
    paddingTop: Platform.OS === 'ios' ? 44 : LIST_MARGIN,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    width: '82%',
    padding: 10,
    marginLeft: 5,
    flex: 1,
  },
  container2: {
    borderBottomWidth: 1,
  },
});
