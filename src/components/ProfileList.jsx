import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import Row from '../components/Row';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../theme/colors';
import Screen from '../components/Screen';
import {LIST_MARGIN} from '../constants';
import {PROFILE_TYPES} from '../redux/reducers/profileReducer';
import {useNavigation} from '@react-navigation/native';
import {size, weight} from '../theme/fonts';
import {getDataApi} from '../utils/fetchData';
import CommonLoader from '../components/CommonLoader';
import {expiryDate} from '../utils/formattedTimeStamp';
import ViewProperties from './ViewProperties';
import {useTheme} from '../context/ThemeProvider';

const ProfileList = ({profile, id, dispatch, auth}) => {
  const {theme} = useTheme();
  const [userData, setUserData] = useState([]);
  const [load, setLoad] = useState(false);
  const [userProperties, setUserProperties] = useState([]);
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const newData = profile.users.filter(item => item._id === id);
    setUserData(newData);

    profile.userProperties.forEach(item => {
      if (item._id === id) {
        setUserProperties(item.userProperties);
        setPage(item.page);
        setCount(item.count);
      }
    });
  }, [id, profile.userProperties, profile.users, setPage, setCount]);

  const handleEditProfile = () => {
    if (id === auth.user._id)
      navigation.navigate('EditProfileScreen', {
        avatar: auth.user.avatar,
        bio: auth.user?.bio,
        fullname: auth.user.fullname,
      });
  };

  const ShowProperty = React.memo(({property}) => {
    const [imageLoad, setImageLoad] = useState(false);
    const handleImageLoad = useCallback(() => {
      setImageLoad(true);
    }, []);

    return (
      <Pressable
        disabled={!property.reviewed}
        style={[
          styles.container,
          {borderColor: theme.borderColor, borderWidth: 0.5, borderRadius: 5},
          property.propertyActive ? {} : {opacity: 0.5},
        ]}
        onPress={() =>
          navigation.push('PropertyDetailScreen', {id: property._id})
        }>
        <>
          {!imageLoad && <CommonLoader />}
          <Image
            source={{uri: property.images[0].url}}
            style={[
              {
                // height: 200,
                width: '100%',
                aspectRatio: 1,
              },
              !imageLoad && styles.hiddenImage,
            ]}
            blurRadius={property.reviewed ? 0 : 35}
            resizeMode="contain"
            onLoad={handleImageLoad}
          />
        </>

        <View style={styles.iconContainer}>
          <Row>
            <AntDesign name="hearto" size={15} color={colors.white} />
            <Text
              style={{
                color: colors.white,
                fontWeight: weight.bold,

                marginRight: 5,
              }}>
              {property.likes.length}
            </Text>
            <ViewProperties
              views={property.views}
              trending={property.trending}
              color="white"
              size={18}
              textSize={13}
              textColor="white"
            />
          </Row>
        </View>

        {!property.reviewed && (
          <View style={styles.reviewedContainer}>
            <Text style={{fontWeight: weight.bold, color: 'white'}}>
              IN REVIEW
            </Text>
          </View>
        )}

        {!property.propertyActive && (
          <View style={styles.soldContainer}>
            {new Date().toISOString() >
            new Date(expiryDate(property.createdAt)) ? (
              <Text style={{fontWeight: weight.bold, color: 'white'}}>
                EXPIRED
              </Text>
            ) : (
              <Text style={{fontWeight: weight.bold, color: 'white'}}>
                SOLD
              </Text>
            )}
          </View>
        )}
      </Pressable>
    );
  });

  const handleLoadMore = useCallback(async () => {
    if (load) return;

    if (count <= 10 * (page - 1)) return;

    setLoad(true);

    const res = await getDataApi(
      `get-user-properties/${id}?limit=${10}&page=${page}`,
      auth.token,
    );

    dispatch({
      type: PROFILE_TYPES.GET_PROFILE_PROPERTIES_UPDATE,
      payload: {...res.data, _id: id, page},
    });

    setLoad(false);
  }, [load, count, page, id, auth.token, dispatch]);

  const ListHeaderComponent = React.memo(() => {
    const [imageLoad, setImageLoad] = useState(false);
    const handleImageLoad = useCallback(() => {
      setImageLoad(true);
    }, []);

    return userData.map(user => (
      <View key={user._id} style={{paddingHorizontal: LIST_MARGIN}}>
        <Row style={{marginTop: 10, overflow: 'hidden'}}>
          <>
            {!imageLoad && <CommonLoader />}

            <Image
              source={{
                uri: id === auth.user._id ? auth.user.avatar : user.avatar,
              }}
              style={[
                styles.avatar,
                {borderColor: theme.borderColor, overflow: 'hidden'},
              ]}
              onLoad={handleImageLoad}
            />
          </>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{color: theme.primaryTextColor, fontSize: size.lg}}>
              {id === auth.user._id ? auth.user.fullname : user.fullname}
            </Text>
            <Row>
              <Text style={{marginRight: 5, color: theme.secondaryTextColor}}>
                Joined:{' '}
                {id === auth.user._id
                  ? new Date(auth.user.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                    })
                  : new Date(user.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                    })}
              </Text>
              <Octicons
                name="verified"
                size={14}
                color={
                  auth.user.verified ? colors.primary : theme.secondaryTextColor
                }
              />
            </Row>
          </View>
          {id === auth.user._id && (
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={24}
              color={theme.secondaryTextColor}
              onPress={handleEditProfile}
            />
          )}
        </Row>
        <Text style={[styles.bio, {color: theme.secondaryTextColor}]}>
          {id === auth.user._id ? auth.user?.bio : user?.bio}
        </Text>
      </View>
    ));
  });

  return (
    <Screen>
      <FlatList
        data={userProperties}
        renderItem={({item}) => <ShowProperty property={item} />}
        keyExtractor={item => item._id}
        bounces={true}
        numColumns={2}
        ListHeaderComponent={ListHeaderComponent}
        style={styles.flatList}
        onEndReached={handleLoadMore}
      />
      {load && <ActivityIndicator size="large" color={colors.primary} />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: LIST_MARGIN,
    maxWidth: '50%',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 3,
    borderRadius: 5,
  },
  soldContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  reviewedContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  hiddenImage: {
    opacity: 0,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
  },
  bio: {
    marginVertical: 10,
    paddingHorizontal: LIST_MARGIN,
    fontSize: size.md,
  },
  noPropertiesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPropertiesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  flatList: {
    flexGrow: 1,
  },
});

export default ProfileList;
