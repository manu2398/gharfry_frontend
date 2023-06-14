import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RecentSearchButton from './RecentSearchButton';
import colors from '../theme/colors';
import {weight} from '../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {TYPES} from '../redux/reducers/filterReducer';
import {useTheme} from '../context/ThemeProvider';

const RecentSearchList = ({recentSearches}) => {
  const {theme} = useTheme();
  const [showMore, setShowMore] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRecentSuggestion = item => {
    navigation.navigate('RootTab', {
      screen: 'Home',
      params: {
        description: item.description,
        location: item.location,
        boundingBox: item.boundingBox,
        image: item.image,
      },
    });

    dispatch({
      type: TYPES.ADDFILTER,
      payload: {
        text: 'All',
        id: 0,
        beds: 0,
        distance: 1,
      },
    });
  };

  const handleButtonPress = () => {
    setShowMore(prev => !prev);
  };

  const ShowButton = ({text}) => {
    return (
      <Pressable onPress={handleButtonPress}>
        <Text
          numberOfLines={1}
          style={[styles.showButton, {color: theme.info}]}>
          {text}
        </Text>
      </Pressable>
    );
  };

  const getList = () => {
    if (!recentSearches || recentSearches.length === 0)
      return <Text style={{color: theme.secondaryTextColor}}>No Items</Text>;

    if (recentSearches.length > 2 && !showMore) {
      return (
        <>
          {recentSearches.map((item, index) =>
            index < 2 ? (
              <RecentSearchButton
                key={index}
                name={item.description}
                onPress={() => handleRecentSuggestion(item)}
              />
            ) : null,
          )}
          <ShowButton text="Show more" />
        </>
      );
    }

    return (
      <>
        {recentSearches.map((item, index) => (
          <RecentSearchButton
            key={index}
            name={item.description}
            onPress={() => handleRecentSuggestion(item)}
          />
        ))}
        {recentSearches.length > 2 ? <ShowButton text="Show less" /> : null}
      </>
    );
  };
  return <View>{getList()}</View>;
};

export default RecentSearchList;

const styles = StyleSheet.create({
  showButton: {
    color: colors.info,
    fontWeight: weight.bold,
  },
});
