import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useQueryClient} from 'react-query';
import React, {useEffect, useState, useCallback, useMemo} from 'react';
import ModalHeader from '../components/ModalHeader';
import Screen from '../components/Screen';
import colors from '../theme/colors';
import Row from '../components/Row';
import {useNavigation} from '@react-navigation/native';
import {LIST_MARGIN} from '../constants';
import {size, weight} from '../theme/fonts';
import {getItParks} from '../../services/location';
import CurrentLocationButton from '../components/CurrentLocationButton';
import RecentSearchList from '../components/RecentSearchList';
import CommonLoader from '../components/CommonLoader';
import {TYPES} from '../redux/reducers/filterReducer';
import {useDispatch} from 'react-redux';
import {useTheme} from '../context/ThemeProvider';

const FindLocationScreen = React.memo(() => {
  const {theme} = useTheme();
  const queryClient = useQueryClient();
  const recentSearches = queryClient.getQueryData('recentSearches');
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [load, setLoad] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value.length === 0) {
      setSuggestions([]);
    }
  }, [value]);

  const setRecentSearch = useCallback(
    formattedItem => {
      queryClient.setQueryData('recentSearches', () => {
        if (recentSearches) {
          let included = false;
          for (let i of recentSearches) {
            if (
              i.description === formattedItem.description &&
              i.location.lat === formattedItem.location.lat &&
              i.location.lng === formattedItem.location.lng
            ) {
              included = true;
              break;
            }
          }
          if (!included) return [formattedItem, ...recentSearches];
        }
        return [formattedItem];
      });
    },
    [queryClient, recentSearches],
  );

  const handleChange = useCallback(val => {
    setValue(val);
  }, []);

  const handleSubmitEditing = useCallback(async () => {
    setLoad(true);
    try {
      const data = await getItParks(value);
      if (data.length > 0) {
        setSuggestions(data);
      } else if (value.length === 0) setSuggestions([]);
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: 'Not Found'}});
    }
    setLoad(false);
  }, [value, dispatch]);

  const handleSubmit = useCallback(
    item => {
      const formattedItem = {
        description: item.name,
        location: item.location,
        boundingBox: item.boundingBox,
        image: item.image,
      };
      setRecentSearch(formattedItem);

      dispatch({
        type: TYPES.ADDFILTER,
        payload: {
          text: 'All',
          id: 0,
          beds: 0,
          distance: 1,
        },
      });

      navigation.navigate('RootTab', {
        screen: 'Home',
        params: {
          description: item.name,
          location: item.location,
          boundingBox: item.boundingBox,
          image: item.image,
        },
      });
    },
    [setRecentSearch, dispatch, navigation],
  );

  const getInput = useMemo(() => {
    return (
      <Row style={{marginTop: 20}}>
        <TextInput
          placeholder="Try.. Quark City, Mohali"
          value={value}
          onChangeText={handleChange}
          style={[
            styles.input,
            {borderColor: theme.borderColor, color: theme.secondaryTextColor},
          ]}
          autoFocus
          selectionColor={colors.primary}
          keyboardType="default"
          onSubmitEditing={handleSubmitEditing}
          placeholderTextColor={theme.secondaryTextColor}
        />
        <Pressable
          onPress={() =>
            navigation.navigate('RootTab', {
              screen: 'Home',
            })
          }>
          <Text style={{color: theme.info, fontSize: size.md, marginLeft: 8}}>
            cancel
          </Text>
        </Pressable>
      </Row>
    );
  }, [
    value,
    handleChange,
    theme.borderColor,
    theme.secondaryTextColor,
    theme.info,
    handleSubmitEditing,
    navigation,
  ]);

  const SuggestedText = React.memo(({locationItem}) => {
    return (
      <View style={[styles.container, {borderBottomColor: theme.borderColor}]}>
        <Text
          style={{
            padding: 10,
            fontWeight: weight.semi,
            flex: 1,
            color: theme.secondaryTextColor,
          }}
          numberOfLines={2}>
          {locationItem.description ||
            locationItem.name + ',' + locationItem.fullName}
        </Text>
      </View>
    );
  });

  return (
    <Screen>
      <ModalHeader
        xShown
        text="Find Location"
        onPress={() =>
          // navigation.navigate('RootTab', {
          //   screen: 'Home',
          // })
          navigation.goBack()
        }
      />
      <View style={{marginHorizontal: LIST_MARGIN, flex: 1}}>
        {getInput}
        {load && <CommonLoader />}
        {suggestions?.length > 0 ? (
          <FlatList
            data={suggestions}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleSubmit(item)}>
                <SuggestedText locationItem={item} />
              </TouchableOpacity>
            )}
          />
        ) : (
          <ScrollView>
            <CurrentLocationButton />
            <Text
              style={[
                styles.recentSearches,
                {color: theme.secondaryTextColor},
              ]}>
              Recent Searches
            </Text>
            <RecentSearchList recentSearches={recentSearches} />
          </ScrollView>
        )}
      </View>
    </Screen>
  );
});

export default FindLocationScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 20,
    width: '82%',
    padding: 10,
  },
  container: {
    borderBottomWidth: 1,
  },
  recentSearches: {fontWeight: weight.bold, marginBottom: 5},
});
