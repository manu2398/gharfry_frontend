import {Animated, View, StyleSheet, Text} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import Lottie from 'lottie-react-native';
import Card from '../components/Card';
import Map from '../components/Map';
import Screen from '../components/Screen';
import AnimatedListHeader from '../components/AnimatedListHeader';
import {size, weight} from '../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPropertyInRadius,
  PROPERTY_TYPES,
} from '../redux/reducers/propertyReducer';
import {getDataApi} from '../utils/fetchData';
import CommonLoader from '../components/CommonLoader';
import {useTheme} from '../context/ThemeProvider';
import {HEADER_HEIGHT, LIST_MARGIN} from '../constants';

const SearchScreen = ({route}) => {
  const [scrollAnimation] = useState(new Animated.Value(0));
  const [mapShown, setMapShown] = useState(false);
  const [load, setLoad] = useState(false);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const {auth, properties, filter} = useSelector(state => state);
  const {theme} = useTheme();

  const handleLoadMore = useCallback(async () => {
    if (load) return;

    if (properties.count <= 10 * (properties.page - 1)) return;

    setLoad(true);

    let url;

    if (filter?.text) {
      url = `get-property-in-radius/${filter.distance || 1}/${
        route.params.location.lat
      }/${route.params.location.lng}?limit=${10}&propertyType=${
        filter.text
      }&page=${properties.page}`;
    }

    if (filter?.beds > 0) {
      url = url + `&beds=${filter.beds}`;
    }

    const res = await getDataApi(url, auth.token);

    dispatch({
      type: PROPERTY_TYPES.GET_PROPERTY_IN_RADIUS_UPDATE,
      payload: res.data,
    });

    setLoad(false);
  }, [load, properties, filter, route.params, auth.token, dispatch]);

  const handleFilter = useCallback(
    async filter => {
      if (load) return;
      if (route.params) {
        setLoad(true);
        let url = `get-property-in-radius/${filter.distance || 1}/${
          route.params.location.lat
        }/${route.params.location.lng}?limit=${10}&propertyType=${filter.text}`;

        if (filter?.beds > 0) {
          url = url + `&beds=${filter.beds}`;
        }

        const res = await getDataApi(url, auth.token);

        dispatch({
          type: PROPERTY_TYPES.GET_PROPERTY_IN_RADIUS,
          payload: {...res.data, page: 2},
        });
      }
      setLoad(false);
    },
    [load, route.params, auth.token, setLoad, dispatch],
  );

  const fetchProperties = async data => {
    dispatch(getPropertyInRadius(data, auth));
  };

  useEffect(() => {
    if (route.params) {
      fetchProperties({
        latitude: route.params.location.lat,
        longitude: route.params.location.lng,
        distance: 1,
      });

      mapRef?.current?.animateCamera({
        center: {
          latitude: Number(route.params.location.lat),
          longitude: Number(route.params.location.lng),
        },
      });
    }
  }, [route.params, properties.firstLoad, dispatch]);

  useEffect(() => {
    if (filter?.text) {
      handleFilter(filter);
    }
  }, [filter]);

  const renderContent = () => {
    if (mapShown) {
      return (
        <Map
          properties={properties.properties}
          mapRef={mapRef}
          initialRegion={
            route?.params
              ? {
                  latitude: Number(route.params.location.lat),
                  longitude: Number(route.params.location.lng),
                  latitudeDelta: 0.4,
                  longitudeDelta: 0.4,
                }
              : undefined
          }
          itPark={route?.params}
        />
      );
    } else {
      if (properties.total > 0) {
        return (
          <>
            <Animated.FlatList
              data={properties.properties}
              style={styles.flatList}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <Card item={item} />}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollAnimation}}}],
                {useNativeDriver: true},
              )}
              scrollEventThrottle={16}
              contentContainerStyle={styles.contentContainer}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
            />
            {load && <CommonLoader />}
          </>
        );
      } else {
        return (
          <View style={styles.noSpaces}>
            {route?.params ? (
              <>
                <Lottie
                  source={require('../assets/animations/notFound.json')}
                  autoPlay
                  style={styles.animation}
                />
                <Text style={[styles.text, {color: theme.primaryTextColor}]}>
                  No Spaces available
                </Text>
                <Text style={{color: theme.secondaryTextColor}}>
                  Define your search more specifically.
                </Text>
                {load && <CommonLoader />}
              </>
            ) : (
              <>
                <Lottie
                  source={require('../assets/animations/mapLoading.json')}
                  autoPlay
                  style={[styles.animation, {marginBottom: -50}]}
                />
                <View>
                  <Text style={[styles.text, {color: theme.primaryTextColor}]}>
                    Begin Your Search
                  </Text>
                  <Text style={{color: theme.secondaryTextColor}}>
                    Search your landmark above
                  </Text>
                </View>
                {load && <CommonLoader />}
              </>
            )}
          </View>
        );
      }
    }
  };

  return (
    <Screen>
      <AnimatedListHeader
        scrollAnimation={scrollAnimation}
        setMapShown={setMapShown}
        mapShown={mapShown}
        location={
          route?.params ? route.params.description : 'Try.. Quark City, Mohali'
        }
        total={properties ? properties.count : undefined}
      />
      {renderContent()}
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  flatList: {
    marginHorizontal: LIST_MARGIN,
  },
  contentContainer: {
    paddingTop: HEADER_HEIGHT,
  },
  noSpaces: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '65%',
    aspectRatio: 1,
  },
  text: {
    fontWeight: weight.bold,
    fontSize: size.lg,
    marginVertical: 5,
  },
});
