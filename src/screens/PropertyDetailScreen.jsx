import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '../components/Screen';
import Carousel from '../components/Carousel.android';
import CardUpper from '../components/CardUpper';

import colors from '../theme/colors';
import {size, weight} from '../theme/fonts';
import {LIST_MARGIN} from '../constants';
import Amenities from '../components/Amenities';
import Row from '../components/Row';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Resources from '../components/Resources';
import {
  addToViews,
  getPropertyDetails,
} from '../redux/reducers/propertyReducer';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getSuggestedProp} from '../redux/reducers/suggestedReducer';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import MapMarker from '../components/Marker';
import {updateCredits} from '../redux/reducers/authReducer';
import formattedTimeStamp, {expiryDate} from '../utils/formattedTimeStamp';
import CommonLoader from '../components/CommonLoader';
import BottomSheetModal from '../components/BottomSheet';
import PayBox from '../components/PayBox';
import {useTheme} from '../context/ThemeProvider';
import moment from 'moment';
import {getNearest} from '../redux/reducers/getNearestReducer';

const PropertyDetailScreen = ({route}) => {
  const {theme} = useTheme();

  const {id} = route.params;
  const [property, setProperty] = useState([]);
  const {auth, detailPost, suggestedPosts, message} = useSelector(
    state => state,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [alreadyInChat, setAlreadyInChat] = useState(false);
  const [imageLoad, setImageLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getPropertyDetails({detailPost, id, auth}));
    if (detailPost.length > 0) {
      const newArr = detailPost.filter(post => post._id === id);
      setProperty(newArr);
    }
  }, [detailPost, dispatch, id, auth]);

  useEffect(() => {
    navigation.addListener('focus', () =>
      dispatch(getSuggestedProp({auth, id})),
    );
    dispatch(getSuggestedProp({auth, id}));
  }, [id]);

  useEffect(() => {
    if (property.length > 0) {
      dispatch(addToViews({auth, id: property[0]?._id}));
    }
  }, [property, auth, dispatch]);

  useEffect(() => {
    if (property[0]?._id) {
      const p = message.items.find(cv => cv.id === property[0]._id);
      if (p?._id) setAlreadyInChat(true);
    }
  }, [property[0]?._id]);

  useEffect(() => {
    if (property[0]?._id) {
      navigation.addListener('focus', () =>
        dispatch(
          getNearest({
            latitude: property[0].latitude,
            longitude: property[0].longitude,
          }),
        ),
      );
      dispatch(
        getNearest({
          latitude: property[0].latitude,
          longitude: property[0].longitude,
        }),
      );
    }
  }, [property[0]]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const addToChat = React.useCallback(
    property => {
      const data = {
        id: property[0]._id,
        address: property[0].address,
        image: property[0].images[0].url,
        avatar: property[0].userId?.avatar,
        fullname: property[0].userId?.fullname,
        _id: property[0].userId?._id,
        propertyActive: property[0].propertyActive,
        cvDate: new Date().toISOString(),
      };

      if (!auth.user.verified) {
        Alert.alert('Verify Account', 'Please verify your email Id first.', [
          {
            text: 'Verify',
            onPress: () => navigation.navigate('Account'),
          },
          {text: 'Cancel'},
        ]);

        return;
      }

      Alert.alert(
        'Confirm',
        'This conversation will cost you 💰25 credits. Are you sure you want to continue?',
        [
          {
            text: 'Yes',
            onPress: async () => {
              const res = await dispatch(
                updateCredits({
                  currentCredits: auth.user.credits,
                  toBeUsed: -25,
                  auth,
                }),
              );

              if (res?.error) {
                handleOpenModal();
                return;
              }

              navigation.navigate('Chat', {data});
            },
          },
          {text: 'No'},
        ],
      );
    },
    [auth.user, navigation],
  );

  const handleImageLoad = () => {
    setImageLoad(true);
  };

  const suggestedProperties = React.useMemo(
    () => suggestedPosts.suggestedProperties,
    [suggestedPosts.suggestedProperties],
  );

  return (
    <Screen>
      {property.map(item => (
        <View key={item._id} style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Carousel item={item} />

            <View style={styles.container}>
              <CardUpper item={item} style={styles.cardUpper} />
              <Row>
                <Text
                  style={[
                    styles.listedText,
                    {marginRight: 20, color: theme.secondaryTextColor},
                  ]}>
                  Listed: {formattedTimeStamp(item.createdAt)}
                </Text>
                {auth.user._id === item.userId?._id && item.propertyActive && (
                  <Text
                    style={[
                      styles.listedText,
                      {color: theme.secondaryTextColor},
                    ]}>
                    Expiry:{' '}
                    {moment(expiryDate(item.createdAt)).format('DD, MMM, YYYY')}
                  </Text>
                )}
              </Row>

              <View style={styles.onlyForBox}>
                <Text style={{color: colors.white, fontWeight: weight.bold}}>
                  {item.propertyType}
                </Text>
              </View>
              <Amenities
                amenities={item.amenities}
                mainScreen
                style={styles.amenities}
              />

              <Pressable
                onPress={() =>
                  navigation.push('ProfileScreen', {
                    id: item.userId?._id,
                  })
                }
                style={styles.ownerContainer}>
                <>
                  {!imageLoad && <CommonLoader />}
                  <Image
                    source={{uri: item.userId?.avatar}}
                    style={[
                      styles.ownerAvatar,
                      {
                        borderWidth: 1,
                        borderColor: theme.borderColor,
                      },
                      !imageLoad && styles.hiddenImage,
                    ]}
                    onLoad={handleImageLoad}
                  />
                </>

                <View style={styles.ownerInfoContainer}>
                  <Row style={styles.ownerRow}>
                    <Text
                      style={[
                        styles.ownerName,
                        {color: theme.primaryTextColor},
                      ]}>
                      {item.userId?.fullname}
                    </Text>
                    <Octicons
                      name="verified"
                      size={14}
                      color={
                        item.userId?.email_verified
                          ? colors.primary
                          : colors.grey
                      }
                    />
                  </Row>
                  <Text
                    style={[
                      styles.ownerRole,
                      {color: theme.secondaryTextColor},
                    ]}>
                    {item.role}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={25}
                  color={theme.secondaryTextColor}
                />
              </Pressable>

              <Resources property={item} style={styles.resources} />

              <View style={styles.descriptionContainer}>
                <Text
                  style={[
                    styles.descriptionTitle,
                    {color: theme.primaryTextColor},
                  ]}>
                  Description
                </Text>
                <Text
                  style={[
                    styles.descriptionText,
                    ,
                    {color: theme.secondaryTextColor},
                  ]}>
                  {item.description}
                </Text>
              </View>

              <View style={styles.mapContainer}>
                <Row style={{marginBottom: 7}}>
                  <Ionicons
                    name="map-outline"
                    size={18}
                    color={colors.primary}
                  />
                  <Text style={styles.text}>Map</Text>
                </Row>
                <MapView
                  initialRegion={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  style={styles.map}
                  provider={PROVIDER_GOOGLE}
                  minZoomLevel={18}
                  maxZoomLevel={18}
                  showsPointsOfInterest={false}
                  loadingEnabled>
                  <Circle
                    center={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                    radius={35} // Adjust the radius as desired (measured in meters)
                    strokeWidth={0.5}
                    fillColor="rgba(255, 0, 0, 0.2)" // Adjust the shade color and opacity as desired
                  />
                  <MapMarker
                    lat={item.latitude}
                    lng={item.longitude}
                    size={44}
                    color={colors.primary}
                  />
                </MapView>
              </View>

              <Row style={{marginVertical: 10}}>
                <FontAwesome
                  name="building-o"
                  size={17}
                  color={colors.primary}
                />
                <Text style={styles.text}>More Similar properties</Text>
              </Row>
            </View>

            {suggestedPosts.loading ? (
              <ActivityIndicator size="small" />
            ) : suggestedProperties.length > 0 ? (
              <Carousel item={suggestedProperties} cards={true} />
            ) : (
              <Text
                style={[
                  styles.noSuggestionsText,
                  {color: theme.secondaryTextColor},
                ]}>
                No suggestions found
              </Text>
            )}
          </ScrollView>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {
                  backgroundColor:
                    alreadyInChat ||
                    auth.user._id === property[0].userId?._id ||
                    !property[0].propertyActive
                      ? colors.lightgrey
                      : colors.primary,
                },
              ]}
              onPress={() => addToChat(property)}
              disabled={
                alreadyInChat ||
                auth.user._id === property[0].userId?._id ||
                !property[0].propertyActive
              }>
              <Text style={styles.buttonText}>
                {alreadyInChat && auth.user._id !== property[0].userId?._id
                  ? 'Conversation in progress'
                  : auth.user._id === property[0].userId?._id
                  ? 'You own this property'
                  : 'Chat with Seller for 💰25'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <BottomSheetModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PayBox />
      </BottomSheetModal>
    </Screen>
  );
};

export default PropertyDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: LIST_MARGIN,
  },
  cardUpper: {
    marginTop: 20,
  },
  listedText: {
    marginTop: 10,
  },
  amenities: {
    marginTop: 10,
    marginBottom: 20,
  },
  ownerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  ownerAvatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 30,
  },
  ownerInfoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  ownerRow: {
    marginRight: 5,
  },
  ownerName: {
    fontSize: size.md,
    fontWeight: weight.bold,
  },
  ownerRole: {
    marginTop: 2,
  },
  resources: {
    marginTop: 10,
  },
  descriptionContainer: {
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: LIST_MARGIN,
  },
  descriptionTitle: {
    fontSize: size.lg,
    fontWeight: weight.bold,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: size.md,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  map: {
    width: '100%',
    height: 200,
  },
  nearbyContainer: {
    marginVertical: 10,
  },
  noSuggestionsText: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: size.md,
    fontWeight: weight.semi,
  },
  text: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  onlyForBox: {
    position: 'absolute',
    top: -10,
    left: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 3,
    zIndex: 2,
  },
  hiddenImage: {
    opacity: 0, // Hide the image until it is loaded
  },
});
