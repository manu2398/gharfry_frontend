import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Marker} from 'react-native-maps';

const MapMarker = ({lat, lng, onPress, color, size, heart}) => {
  return (
    <Marker coordinate={{latitude: lat, longitude: lng}} onPress={onPress}>
      <MaterialCommunityIcons name={'fire'} color={color} size={size} />
      {heart && (
        <MaterialCommunityIcons
          name={'heart'}
          color={'red'}
          size={10}
          style={{position: 'absolute', top: 5}}
        />
      )}
    </Marker>
  );
};

export default MapMarker;
