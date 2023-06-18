import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../components/Screen';
import {LIST_MARGIN} from '../constants';
import {weight} from '../theme/fonts';
import {getDataApi} from '../utils/fetchData';
import {useDispatch, useSelector} from 'react-redux';
import CommonLoader from '../components/CommonLoader';
import CardHorizontal from '../components/CardHorizontal';
import {FAV_TYPES, getFav} from '../redux/reducers/favoriteReducer';
import {useTheme} from '../context/ThemeProvider';

const SavedPropertiesScreen = () => {
  const {theme} = useTheme();
  const {fav} = useSelector(state => state);
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (fav.firstLoad) return;

    if (auth.token) dispatch(getFav({auth}));
  }, [dispatch, auth, fav.firstLoad]);

  const handleMore = async () => {
    if (load) return;

    if (fav.count <= 10 * (fav.page - 1)) return;
    setLoad(true);

    const res = await getDataApi(
      `savedPosts?limit=${10}&page=${fav.page}`,
      auth.token,
    );

    dispatch({type: FAV_TYPES.PAGINATION, payload: res.data});

    setLoad(false);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
          Favorite Properties
        </Text>
        {fav.loading && <CommonLoader />}
        {fav.fav.length > 0 ? (
          <View style={{flex: 1, marginTop: 20}}>
            <FlatList
              data={fav.fav}
              bounces={false}
              keyExtractor={item => item._id.toString()}
              onEndReached={handleMore}
              renderItem={({item}) => (
                <CardHorizontal item={item} style={styles.flatContainer} />
              )}
            />
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: theme.secondaryTextColor}}>
              You haven't liked any property yet!
            </Text>
          </View>
        )}
        {load && <CommonLoader />}
      </View>
    </Screen>
  );
};

export default SavedPropertiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: weight.full,
    marginTop: 10,
    paddingHorizontal: LIST_MARGIN,
  },
  flatContainer: {
    marginVertical: 10,
  },
});
