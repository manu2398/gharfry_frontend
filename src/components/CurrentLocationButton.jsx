import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Row from './Row';
import {weight} from '../theme/fonts';
import colors from '../theme/colors';

import {useNavigation} from '@react-navigation/native';
import {useLocationContext} from '../context/CurrentLocationContext';
import {useDispatch} from 'react-redux';
import {TYPES} from '../redux/reducers/filterReducer';
import {useTheme} from '../context/ThemeProvider';

const CurrentLocationButton = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {location} = useLocationContext();
  const dispatch = useDispatch();

  const requestLocationAccessAsync = async () => {
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

    handleNavigate(location);
  };

  const handleNavigate = position => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    let boundingBox = {
      max: {
        lat: (lat + 0.01).toString(),
        lng: (lng + 0.01).toString(),
      },
      min: {
        lat: (lat - 0.01).toString(),
        lng: (lng - 0.01).toString(),
      },
    };

    dispatch({
      type: TYPES.ADDFILTER,
      payload: {text: 'All', id: 0, beds: 0, distance: 1},
    });

    navigation.navigate('RootTab', {
      screen: 'Home',
      params: {
        description: 'Your current location',
        location: {lat, lng},
        boundingBox,
        image:
          'https://res.cloudinary.com/dmiu93fth/image/upload/v1680068520/v-network/dhvl9tmu3wyojfj2royj.png',
      },
    });
  };

  return (
    <>
      <Row style={{marginVertical: 15}}>
        <FontAwesome name="location-arrow" size={20} color={colors.primary} />
        {location === 'notGranted' ? (
          <Row>
            <TouchableOpacity onPress={requestLocationAccessAsync}>
              <Text style={[styles.text, {color: theme.info}]}>
                Use my current location
              </Text>
            </TouchableOpacity>
          </Row>
        ) : !location ? (
          <TouchableOpacity onPress={requestLocationAccessAsync}>
            <Text style={[styles.text, {color: theme.info}]}>
              Use my current location
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={requestLocationAccessAsync}>
            <Text style={[styles.text, {color: theme.info}]}>
              Use my current location
            </Text>
          </TouchableOpacity>
        )}
      </Row>
    </>
  );
};

export default CurrentLocationButton;

const styles = StyleSheet.create({
  text: {marginLeft: 10, fontWeight: weight.bold},
});
