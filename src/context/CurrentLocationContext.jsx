import {PermissionsAndroid, Platform} from 'react-native';
import {createContext, useContext, useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

const LocationContext = createContext({location: null});

export const CurreLocationContextProvider = ({children}) => {
  const [location, setLocation] = useState(null);

  const requestLocationAccessAsync = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Permission',
            message:
              'Gharfry wants to access your current location' +
              ' so it can put you on a map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        // if (granted === PermissionsAndroid.RESULTS.DENIED) {
        //   Alert.alert(
        //     "Can't get location, Go to Settings > Apps > Gharfry and allow location access.",
        //   );
        //   return;
        // }

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              setLocation(position);
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          setLocation('notGranted');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      if (auth === 'granted') {
        Geolocation.getCurrentPosition(
          position => {
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        setLocation('notGranted');
      }
    }
  };

  useEffect(() => {
    requestLocationAccessAsync();
  }, []);

  return (
    <LocationContext.Provider value={{location}}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
